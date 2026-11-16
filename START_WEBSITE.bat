@echo off
setlocal
cd /d "%~dp0"
echo.
echo ==================================================
echo    HAPPY MOON DECORATION - 3D WEBSITE
 echo ==================================================
echo.
where node >nul 2>nul
if errorlevel 1 (
  echo ERROR: Node.js is not installed.
  echo Download Node.js LTS from https://nodejs.org/
  pause
  exit /b 1
)
where npm >nul 2>nul
if errorlevel 1 (
  echo ERROR: npm is not installed with Node.js.
  pause
  exit /b 1
)
if not exist "node_modules\" (
  echo Installing React, TypeScript and 3D dependencies...
  call npm install
  if errorlevel 1 (
    echo.
    echo Installation failed. Check internet and try again.
    pause
    exit /b 1
  )
)
echo.
echo Starting website... Browser should open automatically.
echo To stop website press Ctrl+C in this window.
echo.
call npm run dev -- --open
pause
