import { useEffect, useState } from 'react';

// Returns true when the screen matches the query, e.g. '(min-width: 768px)'
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener('change', update); // runs when the window is resized
    return () => media.removeEventListener('change', update);
  }, [query]);

  return matches;
};

export default useMediaQuery;