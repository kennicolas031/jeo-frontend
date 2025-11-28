// src/pages/Profile.jsx
import React, { useState } from "react";
import { 
  ArrowLeft, User, Mail, Shield, Camera, Save, 
  Lock, Phone, Calendar, Edit2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState({
    username: "john_agent",
    fullName: "John Doe",
    email: "john.doe@jeo.co.za",
    phone: "+27 82 123 4567",
    role: "Agent",
    department: "Credit Management",
    joinDate: "January 15, 2023",
    profilePicture: null
  });

  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setProfileData(prev => ({
          ...prev,
          profilePicture: file
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Saving profile:", profileData);
    setIsEditing(false);
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      "Super Admin": "#ef4444",
      "Admin": "#f59e0b",
      "Agent": "#8b5cf6",
      "Viewer": "#6b7280"
    };
    return colors[role] || "#8b5cf6";
  };

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/agent-console')}>
          <ArrowLeft size={20} />
          <span>Back to Console</span>
        </button>
        <div className="header-actions">
          <h1>My Profile</h1>
          {!isEditing && (
            <button 
              className="edit-profile-btn"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 size={18} />
              Edit Profile
            </button>
          )}
        </div>
        <p>Manage your account information and settings</p>
      </div>

      <div className="profile-container">
        {/* Profile Card */}
        <div className="profile-card-section">
          <div className="profile-card">
            {/* Profile Picture */}
            <div className="profile-picture-section">
              <div className="profile-picture-wrapper">
                {previewImage ? (
                  <img 
                    src={previewImage} 
                    alt="Profile" 
                    className="profile-picture"
                  />
                ) : (
                  <div className="profile-picture-placeholder">
                    <User size={64} />
                  </div>
                )}
                {isEditing && (
                  <label htmlFor="profile-picture-input" className="change-picture-btn">
                    <Camera size={18} />
                  </label>
                )}
              </div>
              <input
                type="file"
                id="profile-picture-input"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              
              <div className="profile-basic-info">
                <h2>{profileData.fullName}</h2>
                <p className="username">@{profileData.username}</p>
                <div 
                  className="role-badge" 
                  style={{ 
                    backgroundColor: getRoleBadgeColor(profileData.role) + '20', 
                    color: getRoleBadgeColor(profileData.role),
                    borderColor: getRoleBadgeColor(profileData.role) + '40' 
                  }}
                >
                  <Shield size={14} />
                  {profileData.role}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="profile-stats">
              <div className="stat-item">
                <Calendar size={20} />
                <div>
                  <p className="stat-label">Joined</p>
                  <p className="stat-value">{profileData.joinDate}</p>
                </div>
              </div>
              <div className="stat-item">
                <Shield size={20} />
                <div>
                  <p className="stat-label">Department</p>
                  <p className="stat-value">{profileData.department}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details Form */}
        <div className="profile-details-section">
          <form onSubmit={handleSave} className="profile-form">
            
            {/* Personal Information */}
            <div className="form-section">
              <h3 className="section-title">
                <User size={20} />
                Personal Information
              </h3>
              
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={profileData.username}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="email">
                    <Mail size={16} />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="phone">
                    <Phone size={16} />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="form-section">
              <h3 className="section-title">
                <Shield size={20} />
                Account Information
              </h3>
              
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="role">Role</label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={profileData.role}
                    disabled
                    className="form-input"
                    style={{ cursor: 'not-allowed', opacity: 0.6 }}
                  />
                  <p className="field-hint">Role cannot be changed by user</p>
                </div>

                <div className="form-field">
                  <label htmlFor="department">Department</label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={profileData.department}
                    disabled
                    className="form-input"
                    style={{ cursor: 'not-allowed', opacity: 0.6 }}
                  />
                  <p className="field-hint">Contact admin to change department</p>
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="form-section">
              <h3 className="section-title">
                <Lock size={20} />
                Security
              </h3>
              <button 
                type="button" 
                className="change-password-btn"
                onClick={() => alert('Change password functionality - to be implemented')}
              >
                <Lock size={18} />
                Change Password
              </button>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="form-actions">
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)} 
                  className="cancel-btn"
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  <Save size={20} />
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}