"""trendscout URL Configuration"""
from django.urls import path, include

urlpatterns = [
    path('api/', include('waitlist.urls')),
] 