// src/pages/CustomerProfile.jsx
import React, { useState } from "react";
import { 
  ArrowLeft, User, Phone, TrendingUp, CreditCard, 
  DollarSign, RepeatIcon, RefreshCw, ChevronDown, ChevronUp,
  Check, X, Clock, FileText, Plus
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function CustomerProfile() {
  const navigate = useNavigate();
  const { customerId } = useParams();
  const [activeTab, setActiveTab] = useState("kyc");
  const [expandedLoanId, setExpandedLoanId] = useState(null);

  // Modal states
  const [isNewLoanModalOpen, setIsNewLoanModalOpen] = useState(false);
  const [isNewDepositModalOpen, setIsNewDepositModalOpen] = useState(false);
  const [isProcessRefundModalOpen, setIsProcessRefundModalOpen] = useState(false);

  // Form states
  const [newLoanData, setNewLoanData] = useState({
    amount: "",
    interestRate: "",
    term: "",
    startDate: "",
    installmentAmount: ""
  });

  const [newDepositData, setNewDepositData] = useState({
    amount: "",
    paymentMethod: "",
    reference: "",
    date: ""
  });

  const [refundData, setRefundData] = useState({
    amount: "",
    reason: "",
    method: ""
  });

  // Mock customer data - replace with actual data from API
  const customerData = {
    id: customerId || "CUST001",
    fullName: "John Michael Doe",
    phoneNumber: "+27 82 123 4567",
    email: "john.doe@email.com",
    status: "Active",
    creditScore: 750,
    profilePicture: null,
    idNumber: "9001015800089",
    address: "123 Main Street, Sandton, Johannesburg, 2196",
    employer: "ABC Corporation",
    income: "R 35,000",
    joinDate: "2023-05-15",
    idPicture: "https://via.placeholder.com/400x250/8b5cf6/ffffff?text=ID+Document",
    selfiePicture: "https://via.placeholder.com/400x250/6366f1/ffffff?text=Customer+Selfie",
    bankStatement: "sample_bank_statement.pdf",
    bankStatementName: "bank_statement_nov_2024.pdf"
  };

  // Mock loans data
  const loansData = [
    {
      id: "LOAN001",
      amount: "R 50,000",
      balance: "R 35,000",
      status: "Active",
      startDate: "2024-01-15",
      endDate: "2025-01-15",
      installments: [
        { id: 1, dueDate: "2024-02-15", amount: "R 5,000", status: "Paid", paidDate: "2024-02-14", onTime: true },
        { id: 2, dueDate: "2024-03-15", amount: "R 5,000", status: "Paid", paidDate: "2024-03-16", onTime: false },
        { id: 3, dueDate: "2024-04-15", amount: "R 5,000", status: "Paid", paidDate: "2024-04-15", onTime: true },
        { id: 4, dueDate: "2024-05-15", amount: "R 5,000", status: "Pending", paidDate: null, onTime: null }
      ]
    },
    {
      id: "LOAN002",
      amount: "R 25,000",
      balance: "R 0",
      status: "Closed",
      startDate: "2023-06-10",
      endDate: "2024-06-10",
      installments: [
        { id: 1, dueDate: "2023-07-10", amount: "R 2,500", status: "Paid", paidDate: "2023-07-09", onTime: true },
        { id: 2, dueDate: "2023-08-10", amount: "R 2,500", status: "Paid", paidDate: "2023-08-10", onTime: true }
      ]
    }
  ];

  // Mock deposits data
  const depositsData = [
    { id: "DEP001", amount: "R 5,000", date: "2024-02-14" },
    { id: "DEP002", amount: "R 5,000", date: "2024-03-16" },
    { id: "DEP003", amount: "R 5,000", date: "2024-04-15" }
  ];

  // Mock overpayments data
  const overpaymentsData = [
    { id: "OVP001", amount: "R 500", date: "2024-03-20" },
    { id: "OVP002", amount: "R 250", date: "2024-04-18" }
  ];

  // Mock refunds data
  const refundsData = [
    { id: "REF001", amount: "R 500", date: "2024-04-25", reason: "Overpayment refund" }
  ];

  const getStatusColor = (status) => {
    const colors = {
      "Active": "#10b981",
      "Inactive": "#6b7280",
      "Closed": "#ef4444",
      "Pending": "#f59e0b"
    };
    return colors[status] || "#8b5cf6";
  };

  const toggleLoanExpansion = (loanId) => {
    setExpandedLoanId(expandedLoanId === loanId ? null : loanId);
  };

  // Loan form handlers
  const handleNewLoanChange = (e) => {
    const { name, value } = e.target;
    setNewLoanData(prev => ({ ...prev, [name]: value }));
  };

  const handleNewLoanSubmit = (e) => {
    e.preventDefault();
    console.log("New Loan Data:", newLoanData);
    // TODO: Add API call to create loan
    setIsNewLoanModalOpen(false);
    setNewLoanData({
      amount: "",
      interestRate: "",
      term: "",
      startDate: "",
      installmentAmount: ""
    });
  };

  // Deposit form handlers
  const handleNewDepositChange = (e) => {
    const { name, value } = e.target;
    setNewDepositData(prev => ({ ...prev, [name]: value }));
  };

  const handleNewDepositSubmit = (e) => {
    e.preventDefault();
    console.log("New Deposit Data:", newDepositData);
    // TODO: Add API call to create deposit
    setIsNewDepositModalOpen(false);
    setNewDepositData({
      amount: "",
      paymentMethod: "",
      reference: "",
      date: ""
    });
  };

  // Refund form handlers
  const handleRefundChange = (e) => {
    const { name, value } = e.target;
    setRefundData(prev => ({ ...prev, [name]: value }));
  };

  const handleProcessRefundSubmit = (e) => {
    e.preventDefault();
    console.log("Refund Data:", refundData);
    // TODO: Add API call to process refund
    setIsProcessRefundModalOpen(false);
    setRefundData({
      amount: "",
      reason: "",
      method: ""
    });
  };

  return (
    <div className="customer-profile-page">
      {/* Back Button */}
      <button className="back-btn-fixed" onClick={() => navigate('/customer-search')}>
        <ArrowLeft size={20} />
        <span>Back to Search</span>
      </button>

      {/* Customer Header - Sticky */}
      <div className="customer-header-sticky">
        <div className="customer-header-content">
          <div className="customer-header-left">
            {customerData.profilePicture ? (
              <img src={customerData.profilePicture} alt="Customer" className="customer-avatar" />
            ) : (
              <div className="customer-avatar-placeholder">
                <User size={32} />
              </div>
            )}
            <div className="customer-header-info">
              <h1>{customerData.fullName}</h1>
              <div className="customer-header-details">
                <span className="detail-item">
                  <Phone size={14} />
                  {customerData.phoneNumber}
                </span>
                <span 
                  className="status-badge"
                  style={{ 
                    backgroundColor: getStatusColor(customerData.status) + '20',
                    color: getStatusColor(customerData.status),
                    borderColor: getStatusColor(customerData.status) + '40'
                  }}
                >
                  {customerData.status}
                </span>
              </div>
            </div>
          </div>
          <div className="customer-credit-score">
            <TrendingUp size={24} />
            <div>
              <p className="score-label">Credit Score</p>
              <p className="score-value">{customerData.creditScore}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="customer-tabs">
          <button 
            className={`tab-btn ${activeTab === "kyc" ? "active" : ""}`}
            onClick={() => setActiveTab("kyc")}
          >
            <User size={18} />
            KYC
          </button>
          <button 
            className={`tab-btn ${activeTab === "loans" ? "active" : ""}`}
            onClick={() => setActiveTab("loans")}
          >
            <CreditCard size={18} />
            Loans
          </button>
          <button 
            className={`tab-btn ${activeTab === "deposits" ? "active" : ""}`}
            onClick={() => setActiveTab("deposits")}
          >
            <DollarSign size={18} />
            Deposits
          </button>
          <button 
            className={`tab-btn ${activeTab === "overpayments" ? "active" : ""}`}
            onClick={() => setActiveTab("overpayments")}
          >
            <RepeatIcon size={18} />
            Overpayments
          </button>
          <button 
            className={`tab-btn ${activeTab === "refunds" ? "active" : ""}`}
            onClick={() => setActiveTab("refunds")}
          >
            <RefreshCw size={18} />
            Refunds
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        
        {/* KYC Tab */}
        {activeTab === "kyc" && (
          <div className="kyc-content">
            
            {/* Documents Section */}
            <div className="info-section">
              <h3>Uploaded Documents</h3>
              <div className="documents-grid">
                
                {/* ID Picture */}
                <div className="document-card">
                  <div className="document-header">
                    <CreditCard size={20} />
                    <span>ID Document</span>
                  </div>
                  <div className="document-preview">
                    {customerData.idPicture ? (
                      <img src={customerData.idPicture} alt="ID Document" className="document-image" />
                    ) : (
                      <div className="document-placeholder">
                        <CreditCard size={48} />
                        <p>No ID image uploaded</p>
                      </div>
                    )}
                  </div>
                  <button className="view-document-btn">
                    View Full Size
                  </button>
                </div>

                {/* Selfie Picture */}
                <div className="document-card">
                  <div className="document-header">
                    <User size={20} />
                    <span>Selfie</span>
                  </div>
                  <div className="document-preview">
                    {customerData.selfiePicture ? (
                      <img src={customerData.selfiePicture} alt="Customer Selfie" className="document-image" />
                    ) : (
                      <div className="document-placeholder">
                        <User size={48} />
                        <p>No selfie uploaded</p>
                      </div>
                    )}
                  </div>
                  <button className="view-document-btn">
                    View Full Size
                  </button>
                </div>

                {/* Bank Statement */}
                <div className="document-card">
                  <div className="document-header">
                    <FileText size={20} />
                    <span>Bank Statement</span>
                  </div>
                  <div className="document-preview pdf-preview">
                    {customerData.bankStatement ? (
                      <div className="pdf-icon">
                        <FileText size={64} />
                        <p className="pdf-filename">{customerData.bankStatementName || "bank_statement.pdf"}</p>
                      </div>
                    ) : (
                      <div className="document-placeholder">
                        <FileText size={48} />
                        <p>No bank statement uploaded</p>
                      </div>
                    )}
                  </div>
                  <button className="view-document-btn" disabled={!customerData.bankStatement}>
                    {customerData.bankStatement ? "Download PDF" : "No PDF Available"}
                  </button>
                </div>

              </div>
            </div>

            {/* Personal Information Section */}
            <div className="info-section">
              <h3>Personal Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Full Name</span>
                  <span className="info-value">{customerData.fullName}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">ID Number</span>
                  <span className="info-value">{customerData.idNumber}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Phone Number</span>
                  <span className="info-value">{customerData.phoneNumber}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email</span>
                  <span className="info-value">{customerData.email}</span>
                </div>
                <div className="info-item full-width">
                  <span className="info-label">Address</span>
                  <span className="info-value">{customerData.address}</span>
                </div>
              </div>
            </div>

            {/* Employment Information Section */}
            <div className="info-section">
              <h3>Employment Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Employer</span>
                  <span className="info-value">{customerData.employer}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Monthly Income</span>
                  <span className="info-value">{customerData.income}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Customer Since</span>
                  <span className="info-value">{customerData.joinDate}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loans Tab */}
        {activeTab === "loans" && (
          <div className="loans-content">
            <div className="tab-header-actions">
              <h2>Loan History</h2>
              <button 
                className="action-btn primary"
                onClick={() => setIsNewLoanModalOpen(true)}
              >
                <Plus size={18} />
                New Loan
              </button>
            </div>

            {loansData.map((loan) => (
              <div key={loan.id} className="loan-card">
                <div 
                  className="loan-header"
                  onClick={() => toggleLoanExpansion(loan.id)}
                >
                  <div className="loan-main-info">
                    <h4>{loan.id}</h4>
                    <span className="loan-amount">{loan.amount}</span>
                    <span 
                      className="loan-status"
                      style={{ 
                        backgroundColor: getStatusColor(loan.status) + '20',
                        color: getStatusColor(loan.status)
                      }}
                    >
                      {loan.status}
                    </span>
                  </div>
                  <div className="loan-details-summary">
                    <span>Balance: {loan.balance}</span>
                    <span>Period: {loan.startDate} to {loan.endDate}</span>
                    {expandedLoanId === loan.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>

                {expandedLoanId === loan.id && (
                  <div className="installments-table">
                    <table>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Due Date</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Paid Date</th>
                          <th>On Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loan.installments.map((installment) => (
                          <tr key={installment.id}>
                            <td>{installment.id}</td>
                            <td>{installment.dueDate}</td>
                            <td>{installment.amount}</td>
                            <td>
                              <span className={`installment-status ${installment.status.toLowerCase()}`}>
                                {installment.status}
                              </span>
                            </td>
                            <td>{installment.paidDate || "-"}</td>
                            <td>
                              {installment.onTime === true && <Check size={18} color="#10b981" />}
                              {installment.onTime === false && <X size={18} color="#ef4444" />}
                              {installment.onTime === null && <Clock size={18} color="#6b7280" />}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Deposits Tab */}
        {activeTab === "deposits" && (
          <div className="data-table-content">
            <div className="tab-header-actions">
              <h2>Deposit History</h2>
              <button 
                className="action-btn primary"
                onClick={() => setIsNewDepositModalOpen(true)}
              >
                <Plus size={18} />
                New Deposit
              </button>
            </div>

            <table className="data-table">
              <thead>
                <tr>
                  <th>Deposit ID</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {depositsData.map((deposit) => (
                  <tr key={deposit.id}>
                    <td>{deposit.id}</td>
                    <td>{deposit.amount}</td>
                    <td>{deposit.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Overpayments Tab */}
        {activeTab === "overpayments" && (
          <div className="data-table-content">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Overpayment ID</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {overpaymentsData.map((overpayment) => (
                  <tr key={overpayment.id}>
                    <td>{overpayment.id}</td>
                    <td>{overpayment.amount}</td>
                    <td>{overpayment.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Refunds Tab */}
        {activeTab === "refunds" && (
          <div className="data-table-content">
            <div className="tab-header-actions">
              <h2>Refund History</h2>
              <button 
                className="action-btn danger"
                onClick={() => setIsProcessRefundModalOpen(true)}
              >
                <RefreshCw size={18} />
                Process Refund
              </button>
            </div>

            <table className="data-table">
              <thead>
                <tr>
                  <th>Refund ID</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                {refundsData.map((refund) => (
                  <tr key={refund.id}>
                    <td>{refund.id}</td>
                    <td>{refund.amount}</td>
                    <td>{refund.date}</td>
                    <td>{refund.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* New Loan Modal */}
      {isNewLoanModalOpen && (
        <div className="modal-overlay" onClick={() => setIsNewLoanModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create New Loan</h3>
              <button className="modal-close" onClick={() => setIsNewLoanModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleNewLoanSubmit} className="modal-form">
              <div className="form-field">
                <label htmlFor="amount">Loan Amount (R) *</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={newLoanData.amount}
                  onChange={handleNewLoanChange}
                  placeholder="Enter loan amount"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="interestRate">Interest Rate (%) *</label>
                <input
                  type="number"
                  step="0.01"
                  id="interestRate"
                  name="interestRate"
                  value={newLoanData.interestRate}
                  onChange={handleNewLoanChange}
                  placeholder="Enter interest rate"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="term">Loan Term (months) *</label>
                <input
                  type="number"
                  id="term"
                  name="term"
                  value={newLoanData.term}
                  onChange={handleNewLoanChange}
                  placeholder="Enter loan term"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="startDate">Start Date *</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={newLoanData.startDate}
                  onChange={handleNewLoanChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="installmentAmount">Monthly Installment (R) *</label>
                <input
                  type="number"
                  id="installmentAmount"
                  name="installmentAmount"
                  value={newLoanData.installmentAmount}
                  onChange={handleNewLoanChange}
                  placeholder="Enter installment amount"
                  className="form-input"
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setIsNewLoanModalOpen(false)} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Create Loan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Deposit Modal */}
      {isNewDepositModalOpen && (
        <div className="modal-overlay" onClick={() => setIsNewDepositModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Record New Deposit</h3>
              <button className="modal-close" onClick={() => setIsNewDepositModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleNewDepositSubmit} className="modal-form">
              <div className="form-field">
                <label htmlFor="depositAmount">Deposit Amount (R) *</label>
                <input
                  type="number"
                  id="depositAmount"
                  name="amount"
                  value={newDepositData.amount}
                  onChange={handleNewDepositChange}
                  placeholder="Enter deposit amount"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="paymentMethod">Payment Method *</label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={newDepositData.paymentMethod}
                  onChange={handleNewDepositChange}
                  className="form-input"
                  required
                >
                  <option value="">Select payment method</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cash">Cash</option>
                  <option value="Debit Order">Debit Order</option>
                  <option value="EFT">EFT</option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="reference">Reference Number *</label>
                <input
                  type="text"
                  id="reference"
                  name="reference"
                  value={newDepositData.reference}
                  onChange={handleNewDepositChange}
                  placeholder="Enter reference number"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="depositDate">Deposit Date *</label>
                <input
                  type="date"
                  id="depositDate"
                  name="date"
                  value={newDepositData.date}
                  onChange={handleNewDepositChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setIsNewDepositModalOpen(false)} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Record Deposit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Process Refund Modal */}
      {isProcessRefundModalOpen && (
        <div className="modal-overlay" onClick={() => setIsProcessRefundModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Process Refund</h3>
              <button className="modal-close" onClick={() => setIsProcessRefundModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleProcessRefundSubmit} className="modal-form">
              <div className="form-field">
                <label htmlFor="refundAmount">Refund Amount (R) *</label>
                <input
                  type="number"
                  id="refundAmount"
                  name="amount"
                  value={refundData.amount}
                  onChange={handleRefundChange}
                  placeholder="Enter refund amount"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="refundReason">Reason for Refund *</label>
                <select
                  id="refundReason"
                  name="reason"
                  value={refundData.reason}
                  onChange={handleRefundChange}
                  className="form-input"
                  required
                >
                  <option value="">Select reason</option>
                  <option value="Overpayment">Overpayment</option>
                  <option value="Loan Cancelled">Loan Cancelled</option>
                  <option value="Duplicate Payment">Duplicate Payment</option>
                  <option value="Error Correction">Error Correction</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="refundMethod">Refund Method *</label>
                <select
                  id="refundMethod"
                  name="method"
                  value={refundData.method}
                  onChange={handleRefundChange}
                  className="form-input"
                  required
                >
                  <option value="">Select refund method</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cash">Cash</option>
                  <option value="Cheque">Cheque</option>
                </select>
              </div>

              <div className="alert-box">
                <p>⚠️ Please verify the refund amount and reason before proceeding. This action will be recorded in the system.</p>
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setIsProcessRefundModalOpen(false)} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="submit-btn danger">
                  Process Refund
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}