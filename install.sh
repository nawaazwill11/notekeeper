#!/bin/bash

echo "Beginning installation process"
echo "(This might take a while)"

echo ""

echo "Installing frontend..."
cd frontend && npm install
echo "Frontend installed!"

echo ""

echo "Installing backend..."
cd ../backend && npm install
echo "Backend installed!"

echo ""

echo "App is ready to begin"
echo "To start using the app, follow:"
echo "  1. Start frontend: cd frontend && npm start"
echo "  2. (New terminal)Start backend: cd backend && npm start"

echo ""

echo "Installation complete!"