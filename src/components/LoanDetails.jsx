// src/components/LoanDetails.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function LoanDetails({ customerId }) {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (customerId) fetchLoans();
  }, [customerId]);

  async function fetchLoans() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('loans')
        .select('*, installments(*)')
        .eq('customer_id', customerId)
        .order('start_date', { ascending: true });

      if (error) throw error;
      setLoans(data);
    } catch (err) {
      console.error('Error fetching loans:', err);
      setLoans([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full mt-4">
      <h3 className="text-xl font-bold mb-4">Loans</h3>
      {loading ? (
        <p>Loading loans...</p>
      ) : loans.length === 0 ? (
        <p>No loans found for this customer.</p>
      ) : (
        loans.map((loan) => (
          <div key={loan.id} className="mb-4 border p-3 rounded">
            <strong className="block text-lg">{loan.loan_code}</strong>
            <p>Status: {loan.status} ({loan.sub_status})</p>
            <ul className="mt-2 list-disc list-inside">
              {loan.installments.map(inst => (
                <li key={inst.id}>
                  #{inst.installment_number} | Due: {inst.due_date} | Paid: {inst.paid_amount}/{inst.expected_amount} | {inst.status}/{inst.sub_status}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
