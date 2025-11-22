// src/components/DepositForm.jsx
import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function DepositForm({ customerId }) {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('EFT');
  const [popReference, setPopReference] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleDeposit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.from('deposits').insert([{
        customer_id: customerId,
        amount: parseFloat(amount),
        payment_date: new Date(),
        method,
        pop_reference: popReference
      }]);
      if (error) throw error;
      alert('Deposit created!');
      setAmount('');
      setPopReference('');
      setMethod('EFT');
    } catch (err) {
      console.error('Error creating deposit:', err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleDeposit} className="bg-white shadow-md rounded-lg p-6 w-full mt-4">
      <h3 className="text-xl font-bold mb-4">New Deposit</h3>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        required
        className="mb-2 p-2 border rounded w-full"
      />
      <input
        type="text"
        placeholder="POP Reference"
        value={popReference}
        onChange={e => setPopReference(e.target.value)}
        required
        className="mb-2 p-2 border rounded w-full"
      />
      <select
        value={method}
        onChange={e => setMethod(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      >
        <option value="EFT">EFT</option>
        <option value="Cash">Cash</option>
        <option value="eWallet">eWallet</option>
      </select>
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded text-white ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
