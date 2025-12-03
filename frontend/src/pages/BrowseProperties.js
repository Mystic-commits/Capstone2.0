import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';
import RequestModal from '../components/RequestModal';
import { FiSearch, FiFilter, FiX, FiHeart, FiHome, FiDroplet, FiMapPin, FiWifi, FiWind } from 'react-icons/fi';

const BrowseProperties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [requestLoading, setRequestLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        propertyType: 'any',
        bedrooms: '',
        minPrice: '',
        maxPrice: '',
        city: '',
        status: 'available',
        amenities: {
            petFriendly: false,
            furnished: false,
            pool: false,
            parking: false,
            wifi: false,
            airConditioning: false
        }
    });
    const [sortBy, setSortBy] = useState('newest');
    const [showFilters, setShowFilters] = useState(false);
    const propertiesPerPage = 9;
    const [currentPage, setCurrentPage] = useState(1);
    
    const priceRange = useMemo(() => {
        if (properties.length === 0) return { min: 0, max: 100000 };
        const prices = properties.map(p => p.price);
        return {
            min: Math.min(...prices),
            max: Math.max(...prices)
        };
    }, [properties]);
    
    const [priceSlider, setPriceSlider] = useState({
        min: priceRange.min,
        max: priceRange.max
    });
    
    useEffect(() => {
        setPriceSlider({
            min: filters.minPrice ? parseInt(filters.minPrice) : priceRange.min,
            max: filters.maxPrice ? parseInt(filters.maxPrice) : priceRange.max
        });
    }, [priceRange.min, priceRange.max]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, filters, sortBy]);
    
    const handlePriceSliderChange = (type, value) => {
        const numValue = parseInt(value);
        if (type === 'min') {
            const newMin = Math.min(numValue, priceSlider.max - 1000);
            setPriceSlider(prev => ({ ...prev, min: newMin }));
            handleFilterChange('minPrice', newMin.toString());
        } else {
            const newMax = Math.max(numValue, priceSlider.min + 1000);
            setPriceSlider(prev => ({ ...prev, max: newMax }));
            handleFilterChange('maxPrice', newMax.toString());
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/properties');
            setProperties(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const cities = useMemo(() => {
        const citySet = new Set(properties.map(p => p.city).filter(Boolean));
        return Array.from(citySet).sort();
    }, [properties]);

    const filteredAndSortedProperties = useMemo(() => {
        let filtered = [...properties];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(property =>
                property.title?.toLowerCase().includes(query) ||
                property.description?.toLowerCase().includes(query) ||
                property.address?.toLowerCase().includes(query) ||
                property.city?.toLowerCase().includes(query)
            );
        }

        if (filters.propertyType && filters.propertyType !== 'any') {
            if (filters.propertyType === 'entire') {
                filtered = filtered.filter(p => p.propertyType === 'house' || p.propertyType === 'apartment');
            } else {
                filtered = filtered.filter(p => p.propertyType === filters.propertyType);
            }
        }

        if (filters.bedrooms) {
            filtered = filtered.filter(p => p.bedrooms === parseInt(filters.bedrooms));
        }

        if (filters.minPrice) {
            filtered = filtered.filter(p => p.price >= parseInt(filters.minPrice));
        }
        if (filters.maxPrice) {
            filtered = filtered.filter(p => p.price <= parseInt(filters.maxPrice));
        }

        if (filters.city) {
            filtered = filtered.filter(p => p.city === filters.city);
        }

        if (filters.status) {
            filtered = filtered.filter(p => p.status === filters.status);
        }

        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'bedrooms':
                filtered.sort((a, b) => b.bedrooms - a.bedrooms);
                break;
            case 'newest':
            default:
                filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
        }

        return filtered;
    }, [properties, searchQuery, filters, sortBy]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleAmenityToggle = (amenity) => {
        setFilters(prev => ({
            ...prev,
            amenities: {
                ...prev.amenities,
                [amenity]: !prev.amenities[amenity]
            }
        }));
    };

    const clearFilters = () => {
        setSearchQuery('');
        setFilters({
            propertyType: 'any',
            bedrooms: '',
            minPrice: '',
            maxPrice: '',
            city: '',
            status: 'available',
            amenities: {
                petFriendly: false,
                furnished: false,
                pool: false,
                parking: false,
                wifi: false,
                airConditioning: false
            }
        });
        setPriceSlider({
            min: priceRange.min,
            max: priceRange.max
        });
        setSortBy('newest');
    };

    const hasActiveFilters = searchQuery || 
                            (filters.propertyType && filters.propertyType !== 'any') || 
                            filters.bedrooms || 
                            filters.minPrice || 
                            filters.maxPrice || 
                            filters.city || 
                            Object.values(filters.amenities).some(v => v) ||
                            sortBy !== 'newest';

    const filteredCount = filteredAndSortedProperties.length;
    const totalPages = Math.max(1, Math.ceil(filteredCount / propertiesPerPage));

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages || 1);
        }
    }, [currentPage, totalPages]);

    const startIndex = (currentPage - 1) * propertiesPerPage;
    const endIndex = startIndex + propertiesPerPage;
    const paginatedProperties = filteredAndSortedProperties.slice(startIndex, endIndex);

    const handleRequestClick = (propertyId) => {
        const property = properties.find(p => p._id === propertyId);
        setSelectedProperty(property);
        setModalOpen(true);
        setSuccessMessage('');
        setErrorMessage('');
    };

    const handleRequestSubmit = async (message) => {
        if (!selectedProperty) return;

        setRequestLoading(true);
        setErrorMessage('');

        try {
            const token = localStorage.getItem('token');
            await axios.post(
                'http://localhost:5000/api/requests',
                { propertyId: selectedProperty._id, message },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuccessMessage('Request sent successfully!');
            setTimeout(() => {
                setModalOpen(false);
                setSuccessMessage('');
                setSelectedProperty(null);
            }, 1500);
        } catch (err) {
            setErrorMessage(err.response?.data?.message || 'Error sending request. Please try again.');
            setTimeout(() => {
                setErrorMessage('');
            }, 4000);
        } finally {
            setRequestLoading(false);
        }
    };

    const handleCloseModal = () => {
        if (!requestLoading) {
            setModalOpen(false);
            setSelectedProperty(null);
            setErrorMessage('');
            setSuccessMessage('');
        }
    };

    if (loading) return <div className="dashboard-container"><div className="loading">Loading...</div></div>;

    return (
        <>
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <div>
                        <h1>Available Properties</h1>
                        <p>Browse through our selection of verified rental properties</p>
                    </div>
                </div>

                <div className="properties-filter-bar">
                    <div className="search-container">
                        <FiSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search by title, location, or description..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    
                    <div className="filter-controls">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="sort-select"
                        >
                            <option value="newest">Newest First</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="bedrooms">Most Bedrooms</option>
                        </select>
                        
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`filter-toggle-btn ${showFilters ? 'active' : ''}`}
                        >
                            <FiFilter /> Filters
                            {hasActiveFilters && <span className="filter-badge"></span>}
                        </button>
                    </div>
                </div>

                {showFilters && (
                    <>
                        <div className="filter-modal-overlay" onClick={() => setShowFilters(false)}></div>
                        <div className="filter-modal">
                            <div className="filter-modal-header">
                                <h2>Filters</h2>
                                <button onClick={() => setShowFilters(false)} className="filter-close-btn">
                                    <FiX size={24} />
                                </button>
                            </div>

                            <div className="filter-modal-content">
                                <div className="filter-section">
                                    <h3 className="filter-section-title">Recommended for you</h3>
                                    <div className="amenity-buttons">
                                        <button
                                            className={`amenity-btn ${filters.amenities.petFriendly ? 'active' : ''}`}
                                            onClick={() => handleAmenityToggle('petFriendly')}
                                        >
                                            <FiHeart size={20} />
                                            <span>Pet-friendly</span>
                                        </button>
                                        <button
                                            className={`amenity-btn ${filters.amenities.furnished ? 'active' : ''}`}
                                            onClick={() => handleAmenityToggle('furnished')}
                                        >
                                            <FiHome size={20} />
                                            <span>Furnished</span>
                                        </button>
                                        <button
                                            className={`amenity-btn ${filters.amenities.pool ? 'active' : ''}`}
                                            onClick={() => handleAmenityToggle('pool')}
                                        >
                                            <FiDroplet size={20} />
                                            <span>Pool</span>
                                        </button>
                                        <button
                                            className={`amenity-btn ${filters.amenities.parking ? 'active' : ''}`}
                                            onClick={() => handleAmenityToggle('parking')}
                                        >
                                            <FiMapPin size={20} />
                                            <span>Parking</span>
                                        </button>
                                        <button
                                            className={`amenity-btn ${filters.amenities.wifi ? 'active' : ''}`}
                                            onClick={() => handleAmenityToggle('wifi')}
                                        >
                                            <FiWifi size={20} />
                                            <span>WiFi</span>
                                        </button>
                                        <button
                                            className={`amenity-btn ${filters.amenities.airConditioning ? 'active' : ''}`}
                                            onClick={() => handleAmenityToggle('airConditioning')}
                                        >
                                            <FiWind size={20} />
                                            <span>AC</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="filter-section">
                                    <h3 className="filter-section-title">Type of place</h3>
                                    <div className="segmented-control">
                                        <button
                                            className={`segment-btn ${filters.propertyType === 'any' ? 'active' : ''}`}
                                            onClick={() => handleFilterChange('propertyType', 'any')}
                                        >
                                            Any type
                                        </button>
                                        <button
                                            className={`segment-btn ${filters.propertyType === 'studio' ? 'active' : ''}`}
                                            onClick={() => handleFilterChange('propertyType', 'studio')}
                                        >
                                            Room
                                        </button>
                                        <button
                                            className={`segment-btn ${filters.propertyType === 'entire' ? 'active' : ''}`}
                                            onClick={() => handleFilterChange('propertyType', 'entire')}
                                        >
                                            Entire home
                                        </button>
                                    </div>
                                </div>

                                <div className="filter-section">
                                    <h3 className="filter-section-title">Price range</h3>
                                    <p className="filter-section-subtitle">Monthly rent, includes all fees</p>
                                    <div className="price-range-container">
                                        <div className="price-range-slider-wrapper">
                                            <div className="price-range-track">
                                                <div 
                                                    className="price-range-fill"
                                                    style={{
                                                        left: `${((priceSlider.min - priceRange.min) / (priceRange.max - priceRange.min)) * 100}%`,
                                                        width: `${((priceSlider.max - priceSlider.min) / (priceRange.max - priceRange.min)) * 100}%`
                                                    }}
                                                ></div>
                                            </div>
                                            <input
                                                type="range"
                                                min={priceRange.min}
                                                max={priceRange.max}
                                                value={priceSlider.min}
                                                onChange={(e) => handlePriceSliderChange('min', e.target.value)}
                                                className="price-range-slider price-range-slider-min"
                                            />
                                            <input
                                                type="range"
                                                min={priceRange.min}
                                                max={priceRange.max}
                                                value={priceSlider.max}
                                                onChange={(e) => handlePriceSliderChange('max', e.target.value)}
                                                className="price-range-slider price-range-slider-max"
                                            />
                                        </div>
                                        <div className="price-range-inputs">
                                            <div className="price-input-group">
                                                <label>Minimum</label>
                                                <input
                                                    type="number"
                                                    placeholder={`₹${priceRange.min}`}
                                                    value={filters.minPrice || ''}
                                                    onChange={(e) => {
                                                        handleFilterChange('minPrice', e.target.value);
                                                        if (e.target.value) {
                                                            setPriceSlider(prev => ({ ...prev, min: parseInt(e.target.value) || priceRange.min }));
                                                        }
                                                    }}
                                                    className="price-input"
                                                />
                                            </div>
                                            <div className="price-input-group">
                                                <label>Maximum</label>
                                                <input
                                                    type="number"
                                                    placeholder={`₹${priceRange.max}+`}
                                                    value={filters.maxPrice || ''}
                                                    onChange={(e) => {
                                                        handleFilterChange('maxPrice', e.target.value);
                                                        if (e.target.value) {
                                                            setPriceSlider(prev => ({ ...prev, max: parseInt(e.target.value) || priceRange.max }));
                                                        }
                                                    }}
                                                    className="price-input"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="filter-section">
                                    <h3 className="filter-section-title">Rooms and beds</h3>
                                    <div className="filter-select-group">
                                        <label>Bedrooms</label>
                                        <select
                                            value={filters.bedrooms}
                                            onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                                            className="filter-select"
                                        >
                                            <option value="">Any</option>
                                            <option value="1">1 Bedroom</option>
                                            <option value="2">2 Bedrooms</option>
                                            <option value="3">3 Bedrooms</option>
                                            <option value="4">4+ Bedrooms</option>
                                        </select>
                                    </div>
                                </div>

                                {cities.length > 0 && (
                                    <div className="filter-section">
                                        <h3 className="filter-section-title">Location</h3>
                                        <div className="filter-select-group">
                                            <label>City</label>
                                            <select
                                                value={filters.city}
                                                onChange={(e) => handleFilterChange('city', e.target.value)}
                                                className="filter-select"
                                            >
                                                <option value="">All Cities</option>
                                                {cities.map(city => (
                                                    <option key={city} value={city}>{city}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="filter-modal-footer">
                                <button onClick={clearFilters} className="clear-all-btn">
                                    Clear all
                                </button>
                                <button 
                                    onClick={() => setShowFilters(false)} 
                                    className="show-results-btn"
                                >
                                    Show {filteredCount > 0 ? filteredCount : properties.length}+ places
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {!loading && !showFilters && (
                    <div className="results-count">
                        {filteredCount > 0 ? (
                            <>
                                Showing {startIndex + 1}-{Math.min(endIndex, filteredCount)} of {filteredCount} properties
                            </>
                        ) : (
                            <>No matching properties</>
                        )}
                        {hasActiveFilters && (
                            <button onClick={clearFilters} className="clear-filters-link">
                                Clear filters
                            </button>
                        )}
                    </div>
                )}

                {filteredCount === 0 ? (
                    <div className="empty-state">
                        <h3>No properties found</h3>
                        <p>
                            {hasActiveFilters 
                                ? 'Try adjusting your filters or search query.' 
                                : 'Check back later for new listings.'}
                        </p>
                        {hasActiveFilters && (
                            <button onClick={clearFilters} className="btn-large btn-primary" style={{ marginTop: '20px' }}>
                                Clear All Filters
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="properties-grid">
                        {paginatedProperties.map(property => (
                            <PropertyCard
                                key={property._id}
                                property={property}
                                onRequest={handleRequestClick}
                            />
                        ))}
                    </div>
                )}

                {filteredCount > propertiesPerPage && (
                    <div className="pagination-controls">
                        <button
                            className="pagination-btn"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <div className="pagination-pages">
                            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(page => (
                                <button
                                    key={page}
                                    className={`pagination-btn page-btn ${page === currentPage ? 'active' : ''}`}
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                        <button
                            className="pagination-btn"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>

            <RequestModal
                isOpen={modalOpen}
                onClose={handleCloseModal}
                onSubmit={handleRequestSubmit}
                propertyTitle={selectedProperty?.title || ''}
                loading={requestLoading}
            />

            {successMessage && (
                <div className="toast toast-success">
                    {successMessage}
                </div>
            )}

            {errorMessage && (
                <div className="toast toast-error">
                    {errorMessage}
                </div>
            )}
        </>
    );
};

export default BrowseProperties;
