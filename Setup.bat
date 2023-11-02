@echo off

call npm i -g yarn
cd ./backend
call yarn

cd ..
cd ./frontend
call yarn

pause