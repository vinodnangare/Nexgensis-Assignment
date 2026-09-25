import { useEffect, useState } from 'react';
import axios from 'axios';
import { getProducts } from '../api/productApi';
import { applyLocalChanges, getTotalAdjustment } from '../utils/localChanges';

// Loads the product list every time the URL values change.
// onPageTooHigh(lastPage) is called when the URL page is past the last page (?page=999).
const useProducts = ({ page, limit, q, category, sortBy, order }, onPageTooHigh) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0); // change it to fetch again

  useEffect(() => {
    // AbortController cancels the old request when a new one starts,
    // so an old (slow) response can never replace a newer one.
    const controller = new AbortController();
    const isUnfiltered = !q && !category;

    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getProducts({ page, limit, q, category, sortBy, order }, controller.signal);
        const allTotal = Math.max(0, data.total + (isUnfiltered ? getTotalAdjustment() : 0));
        const totalPages = Math.ceil(allTotal / limit);

        // ?page=999 -> go to the last page (the effect runs again with the new page)
        if (allTotal > 0 && page > totalPages) {
          onPageTooHigh(totalPages);
          return;
        }

        setProducts(applyLocalChanges(data.products, isUnfiltered && page === 1));
        setTotal(allTotal);
        setLoading(false);
      } catch (err) {
        if (axios.isCancel(err)) return; // cancelled on purpose, ignore
        setError(err.message);
        setLoading(false);
      }
    };

    load();
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, q, category, sortBy, order, reloadKey]);

  const reload = () => setReloadKey((key) => key + 1);

  return { products, total, loading, error, reload };
};

export default useProducts;