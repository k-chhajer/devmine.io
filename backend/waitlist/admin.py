from django.contrib import admin
from django.utils.html import format_html
from django.utils import timezone
from .models import WaitlistEntry, WaitlistStats


@admin.register(WaitlistEntry)
class WaitlistEntryAdmin(admin.ModelAdmin):
    """
    Admin interface for managing waitlist entries
    """
    list_display = [
        'email',
        'created_at',
        'is_verified',
        'source',
        'is_recent_signup',
        'ip_address_masked'
    ]
    list_filter = [
        'is_verified',
        'source',
        'created_at',
    ]
    search_fields = ['email']
    readonly_fields = [
        'id',
        'created_at',
        'updated_at',
        'ip_address',
        'user_agent',
        'verification_token'
    ]
    ordering = ['-created_at']

    def is_recent_signup(self, obj):
        """Show if signup is recent (last 24 hours)"""
        if obj.is_recent:
            return format_html(
                '<span style="color: green;">✓ Recent</span>'
            )
        return format_html(
            '<span style="color: gray;">-</span>'
        )
    is_recent_signup.short_description = 'Recent Signup'

    def ip_address_masked(self, obj):
        """Show masked IP address for privacy"""
        if obj.ip_address:
            parts = obj.ip_address.split('.')
            if len(parts) == 4:
                return f"{parts[0]}.{parts[1]}.xxx.xxx"
            return "xxx.xxx.xxx.xxx"
        return "-"
    ip_address_masked.short_description = 'IP Address (Masked)'

    def get_queryset(self, request):
        """Optimize queryset for admin"""
        return super().get_queryset(request).select_related()


@admin.register(WaitlistStats)
class WaitlistStatsAdmin(admin.ModelAdmin):
    """
    Admin interface for waitlist statistics
    """
    list_display = [
        'date',
        'daily_signups',
        'total_signups',
        'unique_ips',
        'growth_indicator'
    ]
    list_filter = ['date']
    ordering = ['-date']
    readonly_fields = ['date', 'daily_signups', 'total_signups', 'unique_ips']

    def growth_indicator(self, obj):
        """Show growth indicator"""
        if obj.daily_signups > 10:
            return format_html(
                '<span style="color: green;">📈 High</span>'
            )
        elif obj.daily_signups > 5:
            return format_html(
                '<span style="color: orange;">📊 Medium</span>'
            )
        return format_html(
            '<span style="color: gray;">📉 Low</span>'
        )
    growth_indicator.short_description = 'Growth'

    def has_add_permission(self, request):
        """Prevent manual addition of stats"""
        return False


# Customize admin site
admin.site.site_header = "Devmine.io Admin"
admin.site.site_title = "Devmine.io Admin"
admin.site.index_title = "Welcome to Devmine.io Administration"
