@echo off
call ./venv/Scripts/activate.bat
python backend/manage.py runserver 0.0.0.0:8000