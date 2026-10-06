@echo off
cd /d "%~dp0"
if not exist _logs mkdir _logs
echo START %date% %time% > _logs\status.txt
where node > _logs\env.log 2>&1
node -v >> _logs\env.log 2>&1
call npm -v >> _logs\env.log 2>&1
call npm install next@latest react@latest react-dom@latest framer-motion@latest gsap@latest lucide-react@latest > _logs\install.log 2>&1
call npm install -D tailwindcss@latest @tailwindcss/postcss@latest typescript@latest @types/react@latest @types/react-dom@latest @types/node@22 >> _logs\install.log 2>&1
echo INSTALLED >> _logs\status.txt
call npx tsc --noEmit > _logs\tsc.log 2>&1
echo TSC %errorlevel% >> _logs\status.txt
call npm run build > _logs\build.log 2>&1
echo BUILD %errorlevel% >> _logs\status.txt
echo DONE >> _logs\status.txt
