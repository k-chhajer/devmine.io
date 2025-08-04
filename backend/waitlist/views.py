from rest_framework import status
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from django.conf import settings
from django.utils import timezone
from django.db import transaction
from django.core.cache import cache
from .models import WaitlistEntry, WaitlistStats
from .serializers import WaitlistEntrySerializer, WaitlistStatsSerializer
import logging
import hashlib
import secrets

logger = logging.getLogger('waitlist')


class WaitlistRateThrottle(AnonRateThrottle):
    """Custom rate throttle for waitlist submissions"""
    scope = 'waitlist'
    rate = '5/hour'  # 5 submissions per hour per IP


def get_client_ip(request):
    """Get the client's IP address from request"""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def get_user_agent(request):
    """Get the user agent from request"""
    return request.META.get('HTTP_USER_AGENT', '')[:500]  # Limit length


@api_view(['POST'])
@throttle_classes([WaitlistRateThrottle])
def join_waitlist(request):
    """
    API endpoint to join the waitlist with enhanced security
    """
    try:
        # Get client information
        client_ip = get_client_ip(request)
        user_agent = get_user_agent(request)

        # Check IP-based rate limiting
        ip_key = f"waitlist_ip_{client_ip}"
        ip_submissions = cache.get(ip_key, 0)

        if ip_submissions >= settings.MAX_EMAILS_PER_IP:
            logger.warning(f"Rate limit exceeded for IP: {client_ip}")
            return Response({
                'error': 'Too many submissions from this IP address. Please try again later.'
            }, status=status.HTTP_429_TOO_MANY_REQUESTS)

        # Validate the email
        serializer = WaitlistEntrySerializer(data=request.data)
        if not serializer.is_valid():
            logger.info(f"Invalid submission from IP {client_ip}: {serializer.errors}")
            return Response({
                'error': serializer.errors.get('email', ['Invalid email address'])[0]
            }, status=status.HTTP_400_BAD_REQUEST)

        # Create the waitlist entry
        with transaction.atomic():
            email = serializer.validated_data['email']

            # Generate verification token
            verification_token = secrets.token_urlsafe(32)

            # Create entry
            entry = WaitlistEntry.objects.create(
                email=email,
                ip_address=client_ip,
                user_agent=user_agent,
                verification_token=verification_token,
                source='website'
            )

            # Update IP-based rate limiting
            cache.set(ip_key, ip_submissions + 1, timeout=3600)  # 1 hour

            # Update daily statistics
            today = timezone.now().date()
            stats, created = WaitlistStats.objects.get_or_create(
                date=today,
                defaults={
                    'daily_signups': 0,
                    'total_signups': WaitlistEntry.objects.count(),
                    'unique_ips': len(set(WaitlistEntry.objects.values_list('ip_address', flat=True)))
                }
            )

            if not created:
                stats.daily_signups += 1
                stats.total_signups = WaitlistEntry.objects.count()
                stats.unique_ips = len(set(WaitlistEntry.objects.values_list('ip_address', flat=True)))
                stats.save()

            logger.info(f"New waitlist signup: {email} from IP {client_ip}")

            return Response({
                'message': 'Successfully joined the waitlist!',
                'position': WaitlistEntry.objects.count(),
                'id': str(entry.id)
            }, status=status.HTTP_201_CREATED)

    except Exception as e:
        logger.error(f"Error processing waitlist signup: {str(e)}")
        return Response({
            'error': 'An error occurred. Please try again later.'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def waitlist_stats(request):
    """
    API endpoint to get waitlist statistics
    """
    try:
        total_signups = WaitlistEntry.objects.count()
        recent_signups = WaitlistEntry.objects.filter(
            created_at__gte=timezone.now() - timezone.timedelta(days=7)
        ).count()

        # Calculate growth rate (last 7 days vs previous 7 days)
        previous_week_signups = WaitlistEntry.objects.filter(
            created_at__gte=timezone.now() - timezone.timedelta(days=14),
            created_at__lt=timezone.now() - timezone.timedelta(days=7)
        ).count()

        if previous_week_signups > 0:
            growth_rate = ((recent_signups - previous_week_signups) / previous_week_signups) * 100
        else:
            growth_rate = 100.0 if recent_signups > 0 else 0.0

        stats_data = {
            'total_signups': total_signups,
            'recent_signups': recent_signups,
            'growth_rate': round(growth_rate, 2)
        }

        serializer = WaitlistStatsSerializer(stats_data)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        logger.error(f"Error fetching waitlist stats: {str(e)}")
        return Response({
            'error': 'Unable to fetch statistics'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def verify_email(request, token):
    """
    API endpoint to verify email address
    """
    try:
        entry = WaitlistEntry.objects.get(verification_token=token)
        entry.is_verified = True
        entry.verification_token = None  # Remove token after verification
        entry.save()

        logger.info(f"Email verified: {entry.email}")

        return Response({
            'message': 'Email successfully verified!'
        }, status=status.HTTP_200_OK)

    except WaitlistEntry.DoesNotExist:
        return Response({
            'error': 'Invalid verification token'
        }, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        logger.error(f"Error verifying email: {str(e)}")
        return Response({
            'error': 'Verification failed'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
