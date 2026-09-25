import { useEffect, useState } from 'react';

// Returns the value only after the user stops changing it for delay
const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer); // typing again cancels the old timer
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;