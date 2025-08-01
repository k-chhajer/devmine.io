from django.urls import path
from . import views

urlpatterns = [
    path('waitlist/join/', views.join_waitlist, name='join_waitlist'),
    path('waitlist/stats/', views.waitlist_stats, name='waitlist_stats'),
] 