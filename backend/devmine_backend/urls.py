"""
URL configuration for devmine_backend project.
"""
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def health_check(request):
    """Health check endpoint for the API"""
    return JsonResponse({
        'status': 'healthy',
        'message': 'DevMine Backend API is running',
        'version': '1.0.0',
        'endpoints': {
            'admin': '/admin/',
            'waitlist_api': '/api/waitlist/',
        }
    })

urlpatterns = [
    path('', health_check, name='health_check'),
    path('admin/', admin.site.urls),
    path('api/waitlist/', include('waitlist.urls')),
]
