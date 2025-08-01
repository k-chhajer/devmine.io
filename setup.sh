#!/bin/bash

echo "🚀 Setting up TrendScout Clone..."

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Create backend directory if it doesn't exist
if [ ! -d "backend" ]; then
    echo "📁 Creating backend directory..."
    mkdir -p backend
fi

# Navigate to backend and set up Python environment
cd backend

echo "🐍 Setting up Python virtual environment..."
python -m venv venv

# Activate virtual environment
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    # Windows
    source venv/Scripts/activate
else
    # macOS/Linux
    source venv/bin/activate
fi

echo "📦 Installing backend dependencies..."
pip install -r ../requirements.txt

echo "🗄️ Setting up database..."
python manage.py makemigrations
python manage.py migrate

echo "✅ Setup complete!"
echo ""
echo "To start the application:"
echo "1. Frontend: npm start (in the root directory)"
echo "2. Backend: cd backend && python manage.py runserver"
echo ""
echo "Frontend will be available at: http://localhost:3000"
echo "Backend API will be available at: http://localhost:8000"
echo "Django Admin will be available at: http://localhost:8000/admin" 