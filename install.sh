#!/bin/bash

# LIA Rapport - Installation Script
# This script sets up your LIA Rapport application

echo "🎓 LIA Rapport - Installation Script"
echo "===================================="
echo ""

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check for npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm found: $(npm --version)"

# Check for Go
if ! command -v go &> /dev/null; then
    echo "⚠️  Go is not installed. Backend will not work."
    echo "   Download from: https://go.dev/dl/"
    echo "   You can still use the frontend with localStorage."
    GO_INSTALLED=false
else
    echo "✅ Go found: $(go version)"
    GO_INSTALLED=true
fi

echo ""
echo "📦 Installing frontend dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Frontend installation failed!"
    exit 1
fi

echo "✅ Frontend dependencies installed!"

if [ "$GO_INSTALLED" = true ]; then
    echo ""
    echo "📦 Installing backend dependencies..."
    cd backend
    go mod download
    if [ $? -ne 0 ]; then
        echo "❌ Backend installation failed!"
        exit 1
    fi
    cd ..
    echo "✅ Backend dependencies installed!"
fi

echo ""
echo "🎉 Installation Complete!"
echo ""
echo "To start the application:"
echo ""
echo "Terminal 1 (Frontend):"
echo "  npm run dev"
echo ""

if [ "$GO_INSTALLED" = true ]; then
    echo "Terminal 2 (Backend):"
    echo "  npm run backend"
    echo ""
    echo "Or run in backend directory:"
    echo "  cd backend && go run main.go"
    echo ""
fi

echo "Then open: http://localhost:3000"
echo ""
echo "📖 See README.md for more information"
echo "🚀 Good luck with your LIA!"
