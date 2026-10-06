@echo off
cd /d "%~dp0"
if not exist _logs mkdir _logs
title VS+ production server
echo Installing packages...
call npm install > _logs\install.log 2>&1
echo Downloading images into public\images (first run only)...
call npm run assets:download > _logs\assets.log 2>&1
findstr /C:"NEXT_PUBLIC_ASSET_BASE" .env.local >nul 2>&1 || echo NEXT_PUBLIC_ASSET_BASE=/images> .env.local
echo Building...
call npm run build > _logs\build.log 2>&1
if errorlevel 1 (
  echo BUILD FAILED - see _logs\build.log
  echo BUILD FAILED > _logs\prod-status.txt
  pause
  exit /b 1
)
echo BUILD OK > _logs\prod-status.txt
echo Starting production server on http://localhost:3000
call npm start > _logs\server.log 2>&1
