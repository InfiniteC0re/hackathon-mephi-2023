@echo off

python -m venv venv
call ./venv/Scripts/activate.bat
pip install -r requirements.txt

cd ./frontend
call npm i -g yarn
call yarn

pause