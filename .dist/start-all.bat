@echo off
start cmd /k "cd /d C:\Users\SHREYAJIT BEURA\OneDrive\Documents\GitHub\bolt-bite\backend && node app.cjs"
timeout /t 2
start cmd /k "cd /d C:\Users\SHREYAJIT BEURA\OneDrive\Documents\GitHub\bolt-bite\agent-devlopment-kit-repo\cms-agent && node server.js"
timeout /t 2
start cmd /k "cd /d C:\Users\SHREYAJIT BEURA\OneDrive\Documents\GitHub\bolt-bite\frontend && npm start"
