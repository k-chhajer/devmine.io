@echo off
REM Backend Setup Script for Windows

echo 🚀 Setting up Devmine.io Backend...

REM Navigate to backend directory
cd backend

REM Create virtual environment
echo 📦 Creating Python virtual environment...
python -m venv venv

REM Activate virtual environment
echo 🔄 Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo 📚 Installing Python dependencies...
pip install -r requirements.txt

REM Copy environment file
echo ⚙️  Setting up environment variables...
copy .env.example .env

REM Generate Django secret key
echo 🔑 Generating Django secret key...
python -c "from django.core.management.utils import get_random_secret_key; import re; content = open('.env', 'r').read(); secret_key = get_random_secret_key(); content = re.sub(r'SECRET_KEY=.*', f'SECRET_KEY={secret_key}', content); open('.env', 'w').write(content); print('✅ Secret key generated and saved to .env')"

REM Run database migrations
echo 🗄️  Running database migrations...
python manage.py makemigrations waitlist
python manage.py migrate

echo.
echo ✅ Backend setup complete!
echo.
echo To start the backend server:
echo   cd backend
echo   call venv\Scripts\activate.bat
echo   python manage.py runserver 8000
echo.
echo Django Admin will be available at: http://localhost:8000/admin/
echo API endpoints will be available at: http://localhost:8000/api/waitlist/
pause
