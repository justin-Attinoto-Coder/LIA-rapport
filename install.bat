@echo off
REM LIA Rapport - Installation Script for Windows
REM This script sets up your LIA Rapport application

echo ================================
echo LIA Rapport - Installation Script
echo ================================
echo.

REM Check for Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo X Node.js is not installed. Please install Node.js first.
    echo   Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js found
node --version

REM Check for npm
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo X npm is not installed.
    pause
    exit /b 1
)

echo [OK] npm found
npm --version

REM Check for Go
where go >nul 2>nul
if %errorlevel% neq 0 (
    echo [!] Go is not installed. Backend will not work.
    echo     Download from: https://go.dev/dl/
    echo     You can still use the frontend with localStorage.
    set GO_INSTALLED=false
) else (
    echo [OK] Go found
    go version
    set GO_INSTALLED=true
)

echo.
echo Installing frontend dependencies...
call npm install

if %errorlevel% neq 0 (
    echo X Frontend installation failed!
    pause
    exit /b 1
)

echo [OK] Frontend dependencies installed!

if "%GO_INSTALLED%"=="true" (
    echo.
    echo Installing backend dependencies...
    cd backend
    go mod download
    if %errorlevel% neq 0 (
        echo X Backend installation failed!
        cd ..
        pause
        exit /b 1
    )
    cd ..
    echo [OK] Backend dependencies installed!
)

echo.
echo =============================
echo Installation Complete!
echo =============================
echo.
echo To start the application:
echo.
echo Terminal 1 ^(Frontend^):
echo   npm run dev
echo.

if "%GO_INSTALLED%"=="true" (
    echo Terminal 2 ^(Backend^):
    echo   npm run backend
    echo.
    echo Or run in backend directory:
    echo   cd backend
    echo   go run main.go
    echo.
)

echo Then open: http://localhost:3000
echo.
echo See README.md for more information
echo Good luck with your LIA!
echo.
pause
