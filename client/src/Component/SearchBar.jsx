import { useEffect, useRef, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import { SearchIcon } from './Icons';

// value is the search text from the URL. "onSearch" updates the URL.
const SearchBar = ({ value, onSearch }) => {
  const [text, setText] = useState(value);
  const debouncedText = useDebounce(text, 500);
  // The last value WE put in the URL. It helps us know if a URL change came from outside.
  const lastSent = useRef(value);

  // URL changed from outside (back button, "Clear filters", category picked)? Update the input.
  // If we changed the URL ourselves, do nothing, or we would overwrite what the user is typing.
  useEffect(() => {
    if (value !== lastSent.current) {
      lastSent.current = value;
      setText(value);
    }
  }, [value]);

  // Call onSearch only after the user stops typing
  useEffect(() => {
    const trimmed = debouncedText.trim();
    if (trimmed !== value) {
      lastSent.current = trimmed;
      onSearch(trimmed);
    }
  }, [debouncedText]);

  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <SearchIcon />
      </span>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search products..."
        className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-3 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      />
    </div>
  );
};

export default SearchBar;