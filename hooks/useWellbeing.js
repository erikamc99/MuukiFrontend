import { useState, useEffect } from 'react';
import { fetchWellbeing } from '../services/wellbeingService';

export function useWellbeing(spaceId) {
  const [wellbeing, setWellbeing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!spaceId) return;
    setLoading(true);
    fetchWellbeing(spaceId)
      .then(data => setWellbeing(data))
      .finally(() => setLoading(false));
  }, [spaceId]);

  return { wellbeing, loading };
}