@echo off
cd ./backend
start /B node ./index.js
cd ..

@echo off
cd ./frontend
start /B yarn dev --host 0.0.0.0 --port 80
