from django.urls import path
from . import views

urlpatterns = [
    path('join/', views.join_waitlist, name='join_waitlist'),
    path('stats/', views.waitlist_stats, name='waitlist_stats'),
    path('verify/<str:token>/', views.verify_email, name='verify_email'),
]
