from rest_framework import serializers
from django.core.validators import EmailValidator
from django.core.exceptions import ValidationError
from .models import WaitlistEntry
import re


class WaitlistEntrySerializer(serializers.ModelSerializer):
    """
    Serializer for waitlist entry with enhanced validation
    """
    email = serializers.EmailField(
        validators=[EmailValidator()],
        error_messages={
            'invalid': 'Please enter a valid email address.',
            'required': 'Email address is required.',
        }
    )

    class Meta:
        model = WaitlistEntry
        fields = ['email']

    def validate_email(self, value):
        """
        Enhanced email validation with additional security checks
        """
        # Convert to lowercase for consistency
        value = value.lower().strip()

        # Check for disposable email domains
        disposable_domains = [
            '10minutemail.com', 'guerrillamail.com', 'mailinator.com',
            'tempmail.org', 'throwaway.email', 'temp-mail.org'
        ]

        domain = value.split('@')[1] if '@' in value else ''
        if domain in disposable_domains:
            raise serializers.ValidationError(
                "Disposable email addresses are not allowed."
            )

        # Basic format validation
        email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_regex, value):
            raise serializers.ValidationError(
                "Please enter a valid email address."
            )

        # Check if email already exists
        if WaitlistEntry.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "This email is already on the waitlist."
            )

        return value


class WaitlistStatsSerializer(serializers.Serializer):
    """
    Serializer for waitlist statistics
    """
    total_signups = serializers.IntegerField()
    recent_signups = serializers.IntegerField()
    growth_rate = serializers.FloatField()
