# Startup Search

A full-stack application for searching and browsing startup companies with a modern React frontend and FastAPI backend.

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

### Backend Setup

1. Install Python dependencies:
```bash
pip install fastapi uvicorn qdrant-client sentence-transformers
```

2. Start the Qdrant server (if not already running):
```bash
# Using Docker
docker run -p 6333:6333 qdrant/qdrant
```

3. Upload data to Qdrant:
```bash
python upload_data.py
```

4. Start the FastAPI server:
```bash
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

## Usage

1. **Search**: Enter a search term in the main search field
2. **City Filter**: Enable city search and enter a city name for location-based filtering
3. **Browse Results**: Click on companies in the left sidebar to view details
4. **View Details**: Company information including description, website, and city will be displayed

## API Endpoints

- `GET /api/search?query={search_term}` - General company search
- `GET /api/search_city?query={search_term}&city={city}` - City-filtered search

## Project Structure

```
startup-search/
├── server.py              # FastAPI backend server
├── search.py              # Hybrid search implementation
├── upload_data.py         # Data upload script
├── startups_demo.json     # Startup database
├── frontend/              # React frontend
│   ├── src/
│   │   ├── App.tsx        # Main React component
│   │   ├── App.css        # Application styles
│   │   └── index.tsx      # Entry point
│   └── package.json       # Frontend dependencies
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
uvicorn server:app --reload --host 0.0.0.0 --port 9000
```

### Frontend Development
```bash
cd frontend
npm start
```

## License

MIT License
