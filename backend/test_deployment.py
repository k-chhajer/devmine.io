#!/usr/bin/env python
"""
Test script to verify Django application can start properly
"""
import os
import sys
import django
from django.core.management import execute_from_command_line

def test_django_startup():
    """Test if Django can start without errors"""
    try:
        # Set up Django
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'devmine_backend.settings')
        django.setup()
        
        # Test basic Django functionality
        from django.conf import settings
        print(f"✅ Django settings loaded successfully")
        print(f"✅ DEBUG mode: {settings.DEBUG}")
        print(f"✅ Database engine: {settings.DATABASES['default']['ENGINE']}")
        print(f"✅ Installed apps: {len(settings.INSTALLED_APPS)} apps")
        
        # Test database connection
        from django.db import connection
        connection.ensure_connection()
        print(f"✅ Database connection successful")
        
        print("\n🎉 Django application is ready for deployment!")
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == '__main__':
    success = test_django_startup()
    sys.exit(0 if success else 1) 