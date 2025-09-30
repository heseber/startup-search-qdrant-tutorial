# Startup Search Frontend

A React TypeScript application for searching and browsing startup companies.

## Features

- **Search Interface**: Text search with optional city filtering
- **Accordion Layout**: Left sidebar with company list and right content area for details
- **Company Icons**: Automatic icon loading and fallback handling
- **Responsive Design**: Mobile-friendly layout
- **Real-time Search**: Enter key support and search button

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

The application will open in your browser at `http://localhost:3000`.

### Building for Production

```bash
npm run build
```

## API Integration

The frontend connects to the FastAPI backend running on `http://localhost:9000`. Make sure the backend server is running before starting the frontend.

### API Endpoints

- `GET /api/search?query={search_term}` - General search
- `GET /api/search_city?query={search_term}&city={city}` - City-filtered search

## Project Structure

```
src/
├── App.tsx          # Main application component
├── App.css          # Application styles
├── index.tsx        # Application entry point
└── index.css        # Global styles
```

## Technologies Used

- React 18
- TypeScript
- Axios (HTTP client)
- CSS3 (styling)