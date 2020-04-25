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
echo '{"notes":[{"id":1,"title":"Sample","data":[{"id":"kp_1_1","keypoint":"Keypoint of a sample note","desc":"Description of a sample note"}]}]}' > db.json
echo "Backend installed!"
echo ""

echo ""

echo "App is ready to begin"
echo "To start using the app, follow:"
echo "  1. Start frontend: cd frontend && npm start"
echo "  2. (New terminal)Start backend: cd backend && npm start"

echo "Installation complete!"