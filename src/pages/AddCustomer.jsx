// src/pages/AddCustomer.jsx
import React, { useState } from "react";
import { 
  ArrowLeft, User, CreditCard, Phone, Mail, MapPin, 
  Briefcase, DollarSign, Upload, FileText, Camera, Image 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AddCustomer() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    first_names: "",
    last_name: "",
    id_number: "",
    id_type: "ID",
    phone_number: "",
    email: "",
    street_address: "",
    suburb: "",
    city: "",
    postal_code: "",
    province: "",
    employment_status: "",
    employer_name: "",
    income: ""
  });

  const [files, setFiles] = useState({
    id_picture: null,
    selfie_picture: null,
    bank_statement: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (file) {
      setFiles(prev => ({
        ...prev,
        [fileType]: file
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Files:", files);
    // TODO: Add your submission logic here
  };

  const handleClear = () => {
    setFormData({
      first_names: "",
      last_name: "",
      id_number: "",
      id_type: "ID",
      phone_number: "",
      email: "",
      street_address: "",
      suburb: "",
      city: "",
      postal_code: "",
      province: "",
      employment_status: "",
      employer_name: "",
      income: ""
    });
    setFiles({
      id_picture: null,
      selfie_picture: null,
      bank_statement: null
    });
  };

  return (
    <div className="add-customer-page">
      {/* Header */}
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/agent-console')}>
          <ArrowLeft size={20} />
          <span>Back to Console</span>
        </button>
        <h1>Add New Customer</h1>
        <p>Create a new customer profile in the system</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="customer-form">
        
        {/* Personal Information Section */}
        <div className="form-section">
          <h2 className="section-title">
            <User size={20} />
            Personal Information
          </h2>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="first_names">
                First Names <span className="required">*</span>
              </label>
              <input
                type="text"
                id="first_names"
                name="first_names"
                value={formData.first_names}
                onChange={handleInputChange}
                placeholder="Enter first names"
                className="form-input"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="last_name">
                Last Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                placeholder="Enter last name"
                className="form-input"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="id_type">
                ID Type <span className="required">*</span>
              </label>
              <select
                id="id_type"
                name="id_type"
                value={formData.id_type}
                onChange={handleInputChange}
                className="form-input"
                required
              >
                <option value="ID">South African ID</option>
                <option value="Passport">Passport</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="id_number">
                <CreditCard size={16} />
                ID/Passport Number <span className="required">*</span>
              </label>
              <input
                type="text"
                id="id_number"
                name="id_number"
                value={formData.id_number}
                onChange={handleInputChange}
                placeholder="Enter ID or passport number"
                className="form-input"
                required
              />
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="form-section">
          <h2 className="section-title">
            <Phone size={20} />
            Contact Information
          </h2>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="phone_number">
                <Phone size={16} />
                Phone Number <span className="required">*</span>
              </label>
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                className="form-input"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="email">
                <Mail size={16} />
                Email Address <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                className="form-input"
                required
              />
            </div>
          </div>
        </div>

        {/* Address Information Section */}
        <div className="form-section">
          <h2 className="section-title">
            <MapPin size={20} />
            Address Information
          </h2>
          <div className="form-grid">
            <div className="form-field full-width">
              <label htmlFor="street_address">
                Street Address <span className="required">*</span>
              </label>
              <input
                type="text"
                id="street_address"
                name="street_address"
                value={formData.street_address}
                onChange={handleInputChange}
                placeholder="Enter street address"
                className="form-input"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="suburb">
                Suburb <span className="required">*</span>
              </label>
              <input
                type="text"
                id="suburb"
                name="suburb"
                value={formData.suburb}
                onChange={handleInputChange}
                placeholder="Enter suburb"
                className="form-input"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="city">
                City <span className="required">*</span>
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Enter city"
                className="form-input"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="postal_code">
                Postal Code <span className="required">*</span>
              </label>
              <input
                type="text"
                id="postal_code"
                name="postal_code"
                value={formData.postal_code}
                onChange={handleInputChange}
                placeholder="Enter postal code"
                className="form-input"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="province">
                Province <span className="required">*</span>
              </label>
              <select
                id="province"
                name="province"
                value={formData.province}
                onChange={handleInputChange}
                className="form-input"
                required
              >
                <option value="">Select province</option>
                <option value="Eastern Cape">Eastern Cape</option>
                <option value="Free State">Free State</option>
                <option value="Gauteng">Gauteng</option>
                <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                <option value="Limpopo">Limpopo</option>
                <option value="Mpumalanga">Mpumalanga</option>
                <option value="North West">North West</option>
                <option value="Northern Cape">Northern Cape</option>
                <option value="Western Cape">Western Cape</option>
              </select>
            </div>
          </div>
        </div>

        {/* Employment Information Section */}
        <div className="form-section">
          <h2 className="section-title">
            <Briefcase size={20} />
            Employment Information
          </h2>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="employment_status">
                Employment Status <span className="required">*</span>
              </label>
              <select
                id="employment_status"
                name="employment_status"
                value={formData.employment_status}
                onChange={handleInputChange}
                className="form-input"
                required
              >
                <option value="">Select status</option>
                <option value="Employed">Employed</option>
                <option value="Self-Employed">Self-Employed</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Retired">Retired</option>
                <option value="Student">Student</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="employer_name">
                Employer Name
              </label>
              <input
                type="text"
                id="employer_name"
                name="employer_name"
                value={formData.employer_name}
                onChange={handleInputChange}
                placeholder="Enter employer name"
                className="form-input"
              />
            </div>

            <div className="form-field">
              <label htmlFor="income">
                <DollarSign size={16} />
                Monthly Income <span className="required">*</span>
              </label>
              <input
                type="number"
                id="income"
                name="income"
                value={formData.income}
                onChange={handleInputChange}
                placeholder="Enter monthly income"
                className="form-input"
                required
              />
            </div>
          </div>
        </div>

        {/* Document Uploads Section */}
        <div className="form-section">
          <h2 className="section-title">
            <Upload size={20} />
            Document Uploads
          </h2>
          <div className="upload-grid">
            
            {/* ID Picture Upload */}
            <div className="upload-field">
              <label className="upload-label">
                <Image size={20} />
                <span>ID Picture <span className="required">*</span></span>
              </label>
              <div className="upload-area">
                <input
                  type="file"
                  id="id_picture"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'id_picture')}
                  className="file-input"
                  required
                />
                <label htmlFor="id_picture" className="file-label">
                  <Upload size={24} />
                  <span className="file-text">
                    {files.id_picture ? files.id_picture.name : "Click to upload ID picture"}
                  </span>
                  <span className="file-hint">PNG, JPG up to 10MB</span>
                </label>
              </div>
            </div>

            {/* Selfie Picture Upload */}
            <div className="upload-field">
              <label className="upload-label">
                <Camera size={20} />
                <span>Selfie Picture <span className="required">*</span></span>
              </label>
              <div className="upload-area">
                <input
                  type="file"
                  id="selfie_picture"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'selfie_picture')}
                  className="file-input"
                  required
                />
                <label htmlFor="selfie_picture" className="file-label">
                  <Upload size={24} />
                  <span className="file-text">
                    {files.selfie_picture ? files.selfie_picture.name : "Click to upload selfie"}
                  </span>
                  <span className="file-hint">PNG, JPG up to 10MB</span>
                </label>
              </div>
            </div>

            {/* Bank Statement Upload */}
            <div className="upload-field">
              <label className="upload-label">
                <FileText size={20} />
                <span>Bank Statement <span className="required">*</span></span>
              </label>
              <div className="upload-area">
                <input
                  type="file"
                  id="bank_statement"
                  accept=".pdf"
                  onChange={(e) => handleFileChange(e, 'bank_statement')}
                  className="file-input"
                  required
                />
                <label htmlFor="bank_statement" className="file-label">
                  <Upload size={24} />
                  <span className="file-text">
                    {files.bank_statement ? files.bank_statement.name : "Click to upload bank statement"}
                  </span>
                  <span className="file-hint">PDF up to 10MB</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="button" onClick={handleClear} className="clear-btn">
            Clear Form
          </button>
          <button type="submit" className="submit-btn">
            <User size={20} />
            Create Customer
          </button>
        </div>
      </form>
    </div>
  );
}