import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = ({ showToast }) => {
  const [entries, setEntries] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedPoster, setSelectedPoster] = useState(null);
  const [nameFilter, setNameFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [directorFilter, setDirectorFilter] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    type: "Movie",
    director: "",
    budget: "",
    location: "",
    duration: "",
    year: "",
    description: "",
    poster: null
  });

  useEffect(() => {
    loadEntries();
  }, [page]);

  const loadEntries = () => {
    setLoading(true);
    setTimeout(() => {
      setEntries([]);
      setLoading(false);
    }, 500);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({
          ...formData,
          poster: event.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      ...formData
    };
    setEntries([newEntry, ...entries]);
    setFormData({
      title: "",
      type: "Movie",
      director: "",
      budget: "",
      location: "",
      duration: "",
      year: "",
      description: "",
      poster: null
    });
    setShowAddForm(false);
    showToast("Entry added successfully!", "success");
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setFormData(entry);
    setShowAddForm(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setEntries(entries.map(entry => 
      entry.id === editingEntry.id ? { ...entry, ...formData } : entry
    ));
    setEditingEntry(null);
    setFormData({
      title: "",
      type: "Movie",
      director: "",
      budget: "",
      location: "",
      duration: "",
      year: "",
      description: "",
      poster: null
    });
    setShowAddForm(false);
    showToast("Entry updated successfully!", "success");
  };

  const handleDelete = (id) => {
    const entryToDelete = entries.find(entry => entry.id === id);
    if (entryToDelete) {
      setEntries(entries.filter(entry => entry.id !== id));
      showToast(`"${entryToDelete.title}" deleted successfully!`, "warning");
    }
  };

  const handlePosterClick = (posterUrl) => {
    setSelectedPoster(posterUrl);
  };

  const closePosterModal = () => {
    setSelectedPoster(null);
  };

  const clearFilters = () => {
    setNameFilter("");
    setTypeFilter("All");
    setDirectorFilter("");
    showToast("Filters cleared!", "info");
  };

  const filteredEntries = entries.filter(entry => {
    if (nameFilter && !entry.title.toLowerCase().includes(nameFilter.toLowerCase())) {
      return false;
    }
    
    if (typeFilter !== "All" && entry.type !== typeFilter) {
      return false;
    }
    
    if (directorFilter && !entry.director.toLowerCase().includes(directorFilter.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const cancelForm = () => {
    setShowAddForm(false);
    setEditingEntry(null);
    setFormData({
      title: "",
      type: "Movie",
      director: "",
      budget: "",
      location: "",
      duration: "",
      year: "",
      description: "",
      poster: null
    });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Media Tracker</h1>
        <div className="header-actions">
          <button 
            className="btn btn-warning add-btn"
            onClick={() => setShowAddForm(true)}
          >
            + Add New Entry
          </button>
          <Link to="/login" className="btn btn-outline-light logout-btn">
            Logout
          </Link>
        </div>
      </div>

      <div className="filters-section">
        <div className="filters-container">
          <div className="filter-row">
            <div className="filter-group">
              <label className="filter-label">
                <span className="filter-icon">🔍</span>
                Search by Name
              </label>
              <input
                type="text"
                placeholder="Enter title..."
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className="filter-input"
              />
            </div>
            
            <div className="filter-group">
              <label className="filter-label">
                <span className="filter-icon">🎬</span>
                Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="filter-select"
              >
                <option value="All">All Types</option>
                <option value="Movie">Movie</option>
                <option value="TV Show">TV Show</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label className="filter-label">
                <span className="filter-icon">👤</span>
                Director
              </label>
              <input
                type="text"
                placeholder="Enter director..."
                value={directorFilter}
                onChange={(e) => setDirectorFilter(e.target.value)}
                className="filter-input"
              />
            </div>
            
            <div className="filter-group">
              <button 
                className="btn btn-outline-secondary clear-filters-btn"
                onClick={clearFilters}
              >
                <span className="filter-icon">🗑️</span>
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editingEntry ? "Edit Entry" : "Add New Entry"}</h2>
            <form onSubmit={editingEntry ? handleUpdate : handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Type *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Movie">Movie</option>
                    <option value="TV Show">TV Show</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Director *</label>
                  <input
                    type="text"
                    name="director"
                    value={formData.director}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Budget</label>
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    placeholder="e.g., $50M"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Hollywood, CA"
                  />
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="e.g., 120 min"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Year *</label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    min="1900"
                    max="2030"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Brief description..."
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Poster Image</label>
                  <input
                    type="file"
                    name="poster"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="file-input"
                  />
                  {formData.poster && (
                    <div className="poster-preview">
                      <img src={formData.poster} alt="Poster preview" />
                    </div>
                  )}
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-warning">
                  {editingEntry ? "Update Entry" : "Add Entry"}
                </button>
                <button type="button" className="btn btn-secondary" onClick={cancelForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="table-container">
        <table className="entries-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Director</th>
              <th>Budget</th>
              <th>Location</th>
              <th>Duration</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map((entry) => (
              <tr key={entry.id}>
                <td>
                  <div className="entry-title">
                    {entry.poster && (
                      <div className="entry-poster" onClick={() => handlePosterClick(entry.poster)}>
                        <img src={entry.poster} alt={entry.title} />
                      </div>
                    )}
                    <div className="entry-details">
                      <strong>{entry.title}</strong>
                      {entry.description && (
                        <small className="entry-description">{entry.description}</small>
                      )}
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`type-badge ${entry.type.toLowerCase().replace(' ', '-')}`}>
                    {entry.type}
                  </span>
                </td>
                <td>{entry.director}</td>
                <td>{entry.budget}</td>
                <td>{entry.location}</td>
                <td>{entry.duration}</td>
                <td>{entry.year}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn btn-sm btn-outline-primary edit-btn"
                      onClick={() => handleEdit(entry)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger delete-btn"
                      onClick={() => handleDelete(entry.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredEntries.length === 0 && entries.length === 0 && (
          <div className="no-entries">
            <p>No entries found.</p>
            <p>Click "Add New Entry" to get started!</p>
          </div>
        )}
        {filteredEntries.length === 0 && entries.length > 0 && (
          <div className="no-entries">
            <p>No entries match your filters.</p>
            <p>Try adjusting your search criteria or clear filters.</p>
          </div>
        )}
        {loading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading more entries...</p>
          </div>
        )}
      </div>

      {selectedPoster && (
        <div className="modal-overlay" onClick={closePosterModal}>
          <div className="poster-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closePosterModal}>×</button>
            <img src={selectedPoster} alt="Full poster" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 