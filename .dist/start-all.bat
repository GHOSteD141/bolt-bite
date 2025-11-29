@echo off
echo Starting BoltBite services...
echo.

REM Start Backend
echo Starting Backend (port 3005)... 
start cmd /k "cd /d C:\Users\SHREYAJIT BEURA\OneDrive\Documents\GitHub\bolt-bite\backend && npm start"
timeout /t 3

REM Start Frontend
echo Starting Frontend (port 3000)... 
start cmd /k "cd /d C:\Users\SHREYAJIT BEURA\OneDrive\Documents\GitHub\bolt-bite\frontend && npm start"

echo.
echo ✅ All services started!
echo Backend: http://localhost:3005
echo Frontend: http://localhost:3000
echo.
pause
