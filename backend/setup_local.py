#!/usr/bin/env python
"""
Local development setup script
"""
import os
import subprocess
import sys

def run_command(command, description):
    """Run a command and handle errors"""
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed: {e}")
        print(f"Error output: {e.stderr}")
        return False

def setup_local_environment():
    """Set up local development environment"""
    print("🚀 Setting up local development environment...\n")
    
    # Check if virtual environment exists
    if not os.path.exists('venv'):
        print("📦 Creating virtual environment...")
        if not run_command("python -m venv venv", "Creating virtual environment"):
            return False
    
    # Activate virtual environment and install dependencies
    if os.name == 'nt':  # Windows
        activate_cmd = "venv\\Scripts\\activate"
        pip_cmd = "venv\\Scripts\\pip"
    else:  # Unix/Linux/Mac
        activate_cmd = "source venv/bin/activate"
        pip_cmd = "venv/bin/pip"
    
    # Install requirements
    if not run_command(f"{pip_cmd} install -r requirements.txt", "Installing dependencies"):
        return False
    
    # Create .env file if it doesn't exist
    if not os.path.exists('.env'):
        print("📝 Creating .env file...")
        env_content = """SECRET_KEY=django-insecure-local-development-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DB_ENGINE=django.db.backends.sqlite3
DB_NAME=db.sqlite3
MAX_EMAILS_PER_IP=5
"""
        with open('.env', 'w') as f:
            f.write(env_content)
        print("✅ .env file created")
    
    # Run migrations
    if not run_command(f"{activate_cmd} && python manage.py migrate", "Running migrations"):
        return False
    
    # Test the application
    if not run_command(f"{activate_cmd} && python test_deployment.py", "Testing application"):
        return False
    
    print("\n🎉 Local environment setup complete!")
    print("\nTo start the development server:")
    if os.name == 'nt':
        print("  venv\\Scripts\\activate && python manage.py runserver")
    else:
        print("  source venv/bin/activate && python manage.py runserver")
    
    return True

if __name__ == '__main__':
    success = setup_local_environment()
    sys.exit(0 if success else 1) 