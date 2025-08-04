#!/bin/bash

# Backend Setup Script for macOS/Linux

echo "🚀 Setting up Devmine.io Backend..."

# Create virtual environment
echo "📦 Creating Python virtual environment..."
cd backend
python3 -m venv venv

# Activate virtual environment
echo "🔄 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📚 Installing Python dependencies..."
pip install -r requirements.txt

# Copy environment file
echo "⚙️  Setting up environment variables..."
cp .env.example .env

# Generate Django secret key
echo "🔑 Generating Django secret key..."
python -c "
from django.core.management.utils import get_random_secret_key
import re

with open('.env', 'r') as f:
    content = f.read()

secret_key = get_random_secret_key()
content = re.sub(r'SECRET_KEY=.*', f'SECRET_KEY={secret_key}', content)

with open('.env', 'w') as f:
    f.write(content)

print(f'✅ Secret key generated and saved to .env')
"

# Run database migrations
echo "🗄️  Running database migrations..."
python manage.py makemigrations waitlist
python manage.py migrate

# Create superuser prompt
echo "👤 Create a superuser for Django admin?"
read -p "Do you want to create a superuser now? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    python manage.py createsuperuser
fi

echo ""
echo "✅ Backend setup complete!"
echo ""
echo "To start the backend server:"
echo "  cd backend"
echo "  source venv/bin/activate"
echo "  python manage.py runserver 8000"
echo ""
echo "Django Admin will be available at: http://localhost:8000/admin/"
echo "API endpoints will be available at: http://localhost:8000/api/waitlist/"
