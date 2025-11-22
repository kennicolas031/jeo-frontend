// src/components/CreditScoreCard.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function CreditScoreCard({ customerId }) {
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (customerId) fetchScore();
  }, [customerId]);

  async function fetchScore() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('credit_score')
        .eq('id', customerId)
        .single();

      if (error) throw error;
      setScore(data.credit_score);
    } catch (err) {
      console.error('Error fetching credit score:', err);
      setScore('N/A');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full">
      <h3 className="text-xl font-bold mb-2">Credit Score</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p className="text-2xl font-semibold">{score ?? 'N/A'}/900</p>
      )}
    </div>
  );
}
