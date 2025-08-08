#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

# Change to backend directory where manage.py is located
cd backend

python manage.py collectstatic --no-input
python manage.py migrate 