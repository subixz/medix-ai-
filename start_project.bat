@echo off
echo Starting MediX AI Project...

echo Starting Backend Server...
start cmd /k "cd backend && venv\Scripts\activate && python app.py"

echo Starting Frontend Server...
start cmd /k "cd frontend && npm run dev"

echo MediX AI is launching! Please wait a moment for the servers to start.
echo Frontend will be running at http://localhost:5173
echo Backend will be running at http://localhost:5000
