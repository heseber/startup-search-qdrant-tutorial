# Startup Search

A full-stack application for searching and browsing startup companies with a modern React frontend and FastAPI backend. This project is based on a tutorial by Qdrant with modifications and a custom React frontend.

The startup data can be downloaded with:
```bash
wget https://storage.googleapis.com/generall-shared-data/startups_demo.json
```

Note: The data is outdated and this project is primarily for learning how to set up a full-stack application with Qdrant as a vector search engine.

## Features

- **Hybrid Search**: Combines dense and sparse vector search using Qdrant
- **City Filtering**: Optional city-based search filtering
- **Modern UI**: React TypeScript frontend with accordion-style layout
- **Company Icons**: Automatic icon loading and display
- **Responsive Design**: Mobile-friendly interface
- **CORS Support**: Cross-origin resource sharing enabled

## Architecture

- **Backend**: FastAPI with Qdrant vector database
- **Frontend**: React TypeScript with modern UI components
- **Search**: Hybrid search using sentence transformers and SPLADE
- **Data**: JSON-based startup database

## Quick Start

### Prerequisites

- Python 3.12+
- Node.js 14+
- Qdrant server running on localhost:6333

### Qdrant Setup

This application requires Qdrant to be installed and running locally on port 6333. Qdrant is a vector similarity search engine that powers the search functionality.

**Using Docker (Recommended)**
```bash
docker run -p 6333:6333 qdrant/qdrant
```

Qdrant will be available at `http://localhost:6333`. You can verify it's running by visiting the web interface at `http://localhost:6333/dashboard`.

For other installation options and detailed configuration instructions, refer to the [official Qdrant documentation](https://qdrant.tech/documentation/quick-start/).

### Backend Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Start the Qdrant server (if not already running):
```bash
# Using Docker
docker run -p 6333:6333 qdrant/qdrant
```

3. Upload data to Qdrant:
```bash
cd backend
python upload_data.py
```

4. Start the FastAPI server:
```bash
cd backend
python server.py
```

The API will be available at `http://localhost:9000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

### Using the Start Script (Recommended)

Instead of starting backend and frontend separately, you can use the provided start script:

```bash
./start.sh
```

This script will:
- Check if Qdrant is running
- Start the FastAPI backend server
- Start the React frontend
- Open the application in your browser at `http://localhost:3000`

Press Ctrl+C to stop all services.

## Usage

1. **Search**: Enter a search term in the main search field
2. **City Filter**: Enable city search and enter a city name for location-based filtering
3. **Browse Results**: Click on companies in the left sidebar to view details
4. **View Details**: Company information including description, website, and city will be displayed

## API Endpoints

- `GET /api/search?query={search_term}&limit={limit}&score_threshold={threshold}` - General search
  - `query` (required): Search term
  - `limit` (optional, default: 5): Maximum number of results to return
  - `score_threshold` (optional, default: 0.7): Minimum similarity score threshold

- `GET /api/search_city?query={search_term}&city={city}&limit={limit}&score_threshold={threshold}` - City-filtered search
  - `query` (required): Search term
  - `city` (required): City name for filtering
  - `limit` (optional, default: 5): Maximum number of results to return
  - `score_threshold` (optional, default: 0.7): Minimum similarity score threshold

## Project Structure

```
startup-search/
├── backend/               # Backend services
│   ├── server.py          # FastAPI backend server
│   ├── search.py          # Hybrid search implementation
│   ├── upload_data.py     # Data upload script
│   └── startups_demo.json # Startup database
├── frontend/              # React frontend
│   ├── public/
│   │   ├── index.html     # HTML template
│   │   ├── favicon.ico    # Favicon
│   │   ├── favicon.svg    # SVG favicon
│   │   ├── logo192.png    # App logo (192x192)
│   │   ├── logo512.png    # App logo (512x512)
│   │   ├── manifest.json  # Web app manifest
│   │   └── robots.txt     # SEO robots file
│   ├── src/
│   │   ├── App.tsx        # Main application component
│   │   ├── App.css        # Application styles
│   │   ├── App.test.tsx   # App component tests
│   │   ├── index.tsx      # Application entry point
│   │   ├── index.css      # Global styles
│   │   ├── logo.svg       # React logo
│   │   ├── react-app-env.d.ts  # TypeScript declarations
│   │   ├── reportWebVitals.ts  # Performance monitoring
│   │   └── setupTests.ts  # Test configuration
│   ├── package.json       # Frontend dependencies
│   ├── package-lock.json  # Dependency lock file
│   └── tsconfig.json      # TypeScript configuration
├── requirements.txt       # Python dependencies
├── pyproject.toml         # Python project configuration
├── start.sh               # Application launcher script
├── LICENSE                # MIT License
└── README.md              # This file
```

## Technologies

### Backend
- FastAPI - Web framework
- Qdrant - Vector database
- Sentence Transformers - Dense embeddings
- SPLADE - Sparse embeddings

### Frontend
- React 18 - UI framework
- TypeScript - Type safety
- Axios - HTTP client
- CSS3 - Styling

## Development

### Backend Development
```bash
# Install dependencies
pip install -r requirements.txt

# Run with auto-reload
cd backend
uvicorn server:app --reload --host 0.0.0.0 --port 9000
```

### Frontend Development
```bash
cd frontend
npm start
```

### Building for Production

**Frontend Build**
```bash
cd frontend
npm run build
```

**Backend Production**
```bash
cd backend
uvicorn server:app --host 0.0.0.0 --port 9000
```

## License

MIT License
