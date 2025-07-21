import React, { useState, useEffect } from 'react';
import { getRulebookContent } from '../api';

function Rulebook() {
  const [rulebookContent, setRulebookContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRulebook = async () => {
      try {
        const response = await getRulebookContent();
        setRulebookContent(response.data);
      } catch (err) {
        setError('Failed to load rulebook content.');
        console.error('Error fetching rulebook content:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRulebook();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading rulebook...</div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-5">{error}</div>;
  }

  return (
    <div className="rulebook-container mt-5">
      <h2 className="text-center mb-4">룰북</h2>
      <div className="card p-4">
        <p>{rulebookContent}</p>
      </div>
    </div>
  );
}

export default Rulebook;
