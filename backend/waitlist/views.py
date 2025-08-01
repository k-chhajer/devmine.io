from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


@api_view(['POST'])
@permission_classes([AllowAny])
def join_waitlist(request):
    """
    Simple endpoint that prints email to terminal
    """
    email = request.data.get('email')
    
    if email:
        print(f"📧 New waitlist signup: {email}")
        return Response({
            'message': 'Successfully joined the waitlist!',
            'email': email
        }, status=status.HTTP_200_OK)
    else:
        return Response({
            'error': 'Email is required'
        }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def waitlist_stats(request):
    """
    Simple stats endpoint
    """
    return Response({
        'message': 'Backend is running!',
        'total_entries': 'N/A (no database)'
    }, status=status.HTTP_200_OK) 