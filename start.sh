#!/bin/bash

# Startup Search Application Launcher

echo "🚀 Starting Startup Search Application..."

# Check if Qdrant is running
echo "📡 Checking Qdrant server..."
if ! curl -s http://localhost:6333/collections > /dev/null; then
    echo "❌ Qdrant server is not running on localhost:6333"
    echo "Please start Qdrant first:"
    echo "docker run -p 6333:6333 qdrant/qdrant"
    exit 1
fi

echo "✅ Qdrant server is running"

# Start backend in background
echo "🔧 Starting FastAPI backend..."
source .venv/bin/activate
python server.py &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start frontend
echo "🎨 Starting React frontend..."
cd frontend
npm start &
FRONTEND_PID=$!

echo "✅ Application started successfully!"
echo "📱 Frontend: http://localhost:3000"
echo "🔌 Backend API: http://localhost:9000"
echo ""
echo "Press Ctrl+C to stop all services"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping services..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for processes
wait
