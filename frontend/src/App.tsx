import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

interface Company {
  name: string;
  alt: string;
  description: string;
  link: string;
  city: string;
  images: string;
}

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cityQuery, setCityQuery] = useState('');
  const [enableCitySearch, setEnableCitySearch] = useState(false);
  const [limit, setLimit] = useState(5);
  const [limitError, setLimitError] = useState<string | null>(null);
  const [scoreThreshold, setScoreThreshold] = useState(0.7);
  const [scoreThresholdError, setScoreThresholdError] = useState<string | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = 'http://localhost:9000';

  const validateLimit = (value: string): boolean => {
    const num = parseInt(value, 10);
    if (isNaN(num) || num < 1 || num > 100) {
      setLimitError('Please enter a number between 1 and 100');
      return false;
    }
    setLimitError(null);
    return true;
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLimit(parseInt(value, 10) || 0);
    validateLimit(value);
  };

  const validateScoreThreshold = (value: string): boolean => {
    const num = parseFloat(value);
    if (isNaN(num) || num < 0 || num > 1) {
      setScoreThresholdError('Please enter a number between 0 and 1');
      return false;
    }
    setScoreThresholdError(null);
    return true;
  };

  const handleScoreThresholdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setScoreThreshold(parseFloat(value) || 0);
    validateScoreThreshold(value);
  };

  const performSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);

    try {
      let response;
      if (enableCitySearch && cityQuery.trim()) {
        response = await axios.get(`${API_BASE_URL}/api/search_city`, {
          params: { query: searchQuery, city: cityQuery, limit: limit, score_threshold: scoreThreshold }
        });
      } else {
        response = await axios.get(`${API_BASE_URL}/api/search`, {
          params: { query: searchQuery, limit: limit, score_threshold: scoreThreshold }
        });
      }
      
      setCompanies(response.data);
      setSelectedCompany(null);
    } catch (err) {
      setError('Failed to fetch search results. Please check if the backend server is running.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    performSearch();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  const handleCompanySelect = (company: Company) => {
    setSelectedCompany(company);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Startup Search</h1>
        <div className="search-container">
          <div className="search-fields">
            <input
              type="text"
              placeholder="Search for companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="search-input"
            />
            
            <div className="city-search-toggle">
              <label className="radio-label">
                <input
                  type="checkbox"
                  checked={enableCitySearch}
                  onChange={(e) => setEnableCitySearch(e.target.checked)}
                />
                Enable city search
              </label>
            </div>

            <div className="search-parameters-row">
              {enableCitySearch && (
                <div className="city-input-container">
                  <input
                    type="text"
                    placeholder="Enter city..."
                    value={cityQuery}
                    onChange={(e) => setCityQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="search-input city-input"
                  />
                </div>
              )}

              <div className="limit-input-container">
                <label htmlFor="limit-input" className="limit-label">
                  Number of results:
                </label>
                <input
                  id="limit-input"
                  type="number"
                  min="1"
                  max="100"
                  value={limit}
                  onChange={handleLimitChange}
                  className={`limit-input ${limitError ? 'error' : ''}`}
                  title={limitError || 'Enter a number between 1 and 100'}
                />
                {limitError && (
                  <div className="limit-error-tooltip">
                    {limitError}
                  </div>
                )}
              </div>

              <div className="threshold-input-container">
                <label htmlFor="threshold-input" className="threshold-label">
                  Score threshold:
                </label>
              <input
                id="threshold-input"
                type="number"
                min="0"
                max="1"
                step="0.1"
                value={scoreThreshold}
                onChange={handleScoreThresholdChange}
                className={`threshold-input ${scoreThresholdError ? 'error' : ''}`}
                title={scoreThresholdError || 'Enter a number between 0 and 1'}
              />
                {scoreThresholdError && (
                  <div className="threshold-error-tooltip">
                    {scoreThresholdError}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleSearch} 
            disabled={loading || !searchQuery.trim() || !!limitError || !!scoreThresholdError}
            className="search-button"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </header>

      <div className="main-content">
        <div className="sidebar">
          <div className="sidebar-header">
            <h2>COMPANIES</h2>
          </div>
          <div className="company-list">
            {companies.length > 0 ? (
              companies.map((company, index) => (
                <div
                  key={index}
                  className={`company-item ${selectedCompany?.name === company.name ? 'selected' : ''}`}
                  onClick={() => handleCompanySelect(company)}
                >
                  <div className="company-icon">
                    <img 
                      src={company.images} 
                      alt={company.alt}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iNCIgZmlsbD0iI0Y1RjVGNSIvPgo8dGV4dCB4PSIyMCIgeT0iMjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QzwvdGV4dD4KPC9zdmc+';
                      }}
                    />
                  </div>
                  <span className="company-name">{company.name}</span>
                </div>
              ))
            ) : (
              <div className="no-results">
                {error ? error : 'No companies found. Try searching!'}
              </div>
            )}
          </div>
        </div>

        <div className="content-area">
          {selectedCompany ? (
            <div className="company-details">
              <div className="company-header">
                <h1 className="company-title">{selectedCompany.name}</h1>
                <p className="company-subtitle">{selectedCompany.alt}</p>
              </div>
              
              <div className="details-grid">
                <div className="detail-box">
                  <h3>Description</h3>
                  <p>{selectedCompany.description}</p>
                </div>
                
                <div className="detail-box">
                  <h3>Website</h3>
                  <a href={selectedCompany.link} target="_blank" rel="noopener noreferrer">
                    {selectedCompany.link}
                  </a>
                </div>
                
                <div className="detail-box">
                  <h3>City</h3>
                  <p>{selectedCompany.city}</p>
                </div>
              </div>
              
              <div className="company-image">
                <img 
                  src={selectedCompany.images} 
                  alt={selectedCompany.alt}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="welcome-message">
              <h2>Welcome to Startup Search</h2>
              <p>Search for companies using the search bar above. Select a company from the left sidebar to view details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;