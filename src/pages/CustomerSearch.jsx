// src/pages/CustomerSearch.jsx
import React, { useState } from "react";
import { Search, ArrowLeft, User, Phone, CreditCard, Hash, Database } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CustomerSearch() {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    idPassport: "",
    customerUID: ""
  });
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Mock search results data - expanded for testing
  const mockCustomers = [
    { id: "CUST001", fullName: "John Michael Doe", phoneNumber: "+27 82 123 4567", status: "Active" },
    { id: "CUST002", fullName: "John Peter Smith", phoneNumber: "+27 83 456 7890", status: "Active" },
    { id: "CUST003", fullName: "John Andrew Brown", phoneNumber: "+27 84 789 0123", status: "Inactive" },
    { id: "CUST004", fullName: "Johnathan Davis", phoneNumber: "+27 85 234 5678", status: "Active" },
    { id: "CUST005", fullName: "Sarah Jane Wilson", phoneNumber: "+27 82 345 6789", status: "Active" },
    { id: "CUST006", fullName: "Michael Robert Johnson", phoneNumber: "+27 83 567 8901", status: "Active" },
    { id: "CUST007", fullName: "Emily Grace Taylor", phoneNumber: "+27 84 678 9012", status: "Inactive" },
    { id: "CUST008", fullName: "David James Anderson", phoneNumber: "+27 85 789 0234", status: "Active" },
    { id: "CUST009", fullName: "Lisa Marie Thomas", phoneNumber: "+27 82 890 1345", status: "Active" },
    { id: "CUST010", fullName: "Christopher Lee Martinez", phoneNumber: "+27 83 901 2456", status: "Active" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setHasSearched(true);
    
    // Mock search logic - replace with actual API call
    const firstName = searchData.firstName.toLowerCase();
    const lastName = searchData.lastName.toLowerCase();
    const phoneNumber = searchData.phoneNumber;
    
    if (firstName || lastName || phoneNumber) {
      const results = mockCustomers.filter(customer => {
        const fullNameLower = customer.fullName.toLowerCase();
        const matchesFirstName = firstName ? fullNameLower.includes(firstName) : true;
        const matchesLastName = lastName ? fullNameLower.includes(lastName) : true;
        const matchesPhone = phoneNumber ? customer.phoneNumber.includes(phoneNumber) : true;
        
        return matchesFirstName && matchesLastName && matchesPhone;
      });
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleClear = () => {
    setSearchData({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      idPassport: "",
      customerUID: ""
    });
    setSearchResults([]);
    setHasSearched(false);
  };

  const loadSampleData = () => {
    setHasSearched(true);
    setSearchResults(mockCustomers);
  };

  const getStatusColor = (status) => {
    return status === "Active" ? "#10b981" : "#6b7280";
  };

  return (
    <div className="customer-search-page">
      {/* Header with back button */}
      <div className="search-header">
        <button className="back-btn" onClick={() => navigate('/agent-console')}>
          <ArrowLeft size={20} />
          <span>Back to Console</span>
        </button>
        <h1>Customer Search</h1>
        <p>Find existing customer records in the system</p>
      </div>

      {/* Search Form */}
      <div className="search-form-container">
        <form onSubmit={handleSearch} className="search-form">
          <div className="form-grid">
            {/* First Name */}
            <div className="form-field">
              <label htmlFor="firstName">
                <User size={18} />
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={searchData.firstName}
                onChange={handleInputChange}
                placeholder="Enter first name"
                className="form-input"
              />
            </div>

            {/* Last Name */}
            <div className="form-field">
              <label htmlFor="lastName">
                <User size={18} />
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={searchData.lastName}
                onChange={handleInputChange}
                placeholder="Enter last name"
                className="form-input"
              />
            </div>

            {/* Phone Number */}
            <div className="form-field">
              <label htmlFor="phoneNumber">
                <Phone size={18} />
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={searchData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                className="form-input"
              />
            </div>

            {/* ID/Passport Number */}
            <div className="form-field">
              <label htmlFor="idPassport">
                <CreditCard size={18} />
                ID/Passport Number
              </label>
              <input
                type="text"
                id="idPassport"
                name="idPassport"
                value={searchData.idPassport}
                onChange={handleInputChange}
                placeholder="Enter ID or Passport"
                className="form-input"
              />
            </div>

            {/* Customer UID */}
            <div className="form-field">
              <label htmlFor="customerUID">
                <Hash size={18} />
                Customer UID
              </label>
              <input
                type="text"
                id="customerUID"
                name="customerUID"
                value={searchData.customerUID}
                onChange={handleInputChange}
                placeholder="Enter customer UID"
                className="form-input"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button type="button" onClick={loadSampleData} className="sample-data-btn">
              <Database size={20} />
              Load Sample Data
            </button>
            <button type="button" onClick={handleClear} className="clear-btn">
              Clear
            </button>
            <button type="submit" className="search-btn">
              <Search size={20} />
              Search Customer
            </button>
          </div>
        </form>

        {/* Search Results */}
        <div className="search-results">
          {!hasSearched ? (
            <div className="no-results">
              <Search size={48} />
              <p>Enter search criteria and click "Search Customer" to find records</p>
              <p style={{ fontSize: '14px', marginTop: '12px', color: 'rgba(255, 255, 255, 0.5)' }}>
                Or click "Load Sample Data" to see test customers
              </p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="results-list">
              <h3>Found {searchResults.length} customer(s)</h3>
              {searchResults.map((customer) => (
                <div 
                  key={customer.id} 
                  className="customer-result-card"
                  onClick={() => navigate(`/customer/${customer.id}`)}
                >
                  <div className="customer-result-info">
                    <div className="customer-avatar-small">
                      <User size={20} />
                    </div>
                    <div className="customer-result-details">
                      <h4>{customer.fullName}</h4>
                      <p>{customer.phoneNumber}</p>
                    </div>
                  </div>
                  <span 
                    className="customer-result-status"
                    style={{ 
                      backgroundColor: getStatusColor(customer.status) + '20',
                      color: getStatusColor(customer.status),
                      borderColor: getStatusColor(customer.status) + '40'
                    }}
                  >
                    {customer.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <Search size={48} />
              <p>No customers found matching your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}