"""
URL configuration for devmine_backend project.
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/waitlist/', include('waitlist.urls')),
]
