@echo off
echo 🚀 Setting up TrendScout Clone...

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
npm install

REM Create backend directory if it doesn't exist
if not exist "backend" (
    echo 📁 Creating backend directory...
    mkdir backend
)

REM Navigate to backend and set up Python environment
cd backend

echo 🐍 Setting up Python virtual environment...
python -m venv venv

REM Activate virtual environment
echo 📦 Installing backend dependencies...
call venv\Scripts\activate.bat
pip install -r ..\requirements.txt

echo 🗄️ Setting up database...
python manage.py makemigrations
python manage.py migrate

echo ✅ Setup complete!
echo.
echo To start the application:
echo 1. Frontend: npm start (in the root directory)
echo 2. Backend: cd backend ^&^& python manage.py runserver
echo.
echo Frontend will be available at: http://localhost:3000
echo Backend API will be available at: http://localhost:8000
echo Django Admin will be available at: http://localhost:8000/admin

pause 