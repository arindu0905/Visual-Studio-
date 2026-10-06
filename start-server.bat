@echo off
cd /d "%~dp0"
title VS+ dev server
call npm run dev > _logs\server.log 2>&1
