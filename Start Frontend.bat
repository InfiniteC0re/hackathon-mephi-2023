@echo off
start http://localhost
cd ./frontend
yarn dev --host 0.0.0.0 --port 80