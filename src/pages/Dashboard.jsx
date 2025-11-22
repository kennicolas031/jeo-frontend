// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import CustomerList from "../components/CustomerList";
import CreditScoreCard from "../components/CreditScoreCard";
import LoanDetails from "../components/LoanDetails";
import DepositForm from "../components/DepositForm";

export default function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("customers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCustomers(data || []); // safeguard
    } catch (err) {
      console.error("Error fetching customers:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">JEO LMS Dashboard</h1>

      {/* Responsive layout for mobile */}
      <div className="flex flex-1 gap-4 h-[80vh] flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="lg:w-1/3 w-full bg-white p-4 shadow-md rounded-lg overflow-y-auto">
          {loading ? (
            <p>Loading customers...</p>
          ) : (
            <CustomerList
              customers={customers}
              selectedCustomer={selectedCustomer}
              onSelectCustomer={setSelectedCustomer}
            />
          )}
        </div>

        {/* Right Pane */}
        <div className="lg:w-2/3 w-full flex flex-col gap-4 overflow-y-auto">
          {selectedCustomer ? (
            <>
              {/* EXTRA SAFETY: prevent crash if selectedCustomer is malformed */}
              {selectedCustomer?.id && (
                <>
                  <CreditScoreCard customerId={selectedCustomer.id} />
                  <LoanDetails customerId={selectedCustomer.id} />
                  <DepositForm customerId={selectedCustomer.id} />
                </>
              )}
            </>
          ) : (
            <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-center h-full">
              <p className="text-gray-500">Select a customer to see details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
