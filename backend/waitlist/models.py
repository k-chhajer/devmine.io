from django.db import models
from django.core.validators import EmailValidator
from django.utils import timezone
import uuid


class WaitlistEntry(models.Model):
    """
    Model to store waitlist email entries securely
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(
        unique=True,
        validators=[EmailValidator()],
        help_text="User's email address"
    )
    ip_address = models.GenericIPAddressField(
        null=True,
        blank=True,
        help_text="IP address for rate limiting"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_verified = models.BooleanField(default=False)
    verification_token = models.CharField(max_length=64, blank=True, null=True)
    source = models.CharField(
        max_length=50,
        default='website',
        help_text="Source of the signup"
    )
    user_agent = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Waitlist Entry"
        verbose_name_plural = "Waitlist Entries"
        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['created_at']),
            models.Index(fields=['ip_address']),
        ]

    def __str__(self):
        return f"{self.email} - {self.created_at.strftime('%Y-%m-%d %H:%M')}"

    @property
    def is_recent(self):
        """Check if entry was created in the last 24 hours"""
        return timezone.now() - self.created_at < timezone.timedelta(hours=24)


class WaitlistStats(models.Model):
    """
    Model to track waitlist statistics
    """
    date = models.DateField(unique=True, default=timezone.now)
    daily_signups = models.PositiveIntegerField(default=0)
    total_signups = models.PositiveIntegerField(default=0)
    unique_ips = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['-date']
        verbose_name = "Waitlist Statistics"
        verbose_name_plural = "Waitlist Statistics"

    def __str__(self):
        return f"{self.date} - {self.daily_signups} signups"
