import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import { getCategories, addProduct, updateProduct, deleteProduct } from '../api/productApi';
import { readParams } from '../utils/queryParams';
import { isLocalProduct, addLocalProduct, editLocalProduct, deleteLocalProduct } from '../utils/localChanges';
import useProducts from '../hooks/useProducts';

import SearchBar from '../Component/SearchBar';
import CategoryFilter from '../Component/CategoryFilter';
import SortSelect from '../Component/SortSelect';
import ProductList from '../Component/ProductList';
import Pagination from '../Component/Pagination';
import ProductSkeleton from '../Component/ProductSkeleton';
import ErrorMessage from '../Component/ErrorMessage';
import EmptyState from '../Component/EmptyState';
import ProductForm from '../Component/ProductForm';
import ConfirmModal from '../Component/ConfirmModal';
import { PlusIcon } from '../Component/Icons';

const labelClass = 'mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // All list settings come from the URL (safe values only)
  const params = readParams(searchParams);
  const { page, limit, q, category, sortBy, order } = params;
  const hasFilters = Boolean(q || category || sortBy);

  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const deleteLock = useRef(false);

  // One helper to change URL values. Empty value removes that key from the URL.
  const updateParams = (changes, replace = false) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        Object.entries(changes).forEach(([key, value]) => {
          if (value === '' || value === null || value === undefined) {
            next.delete(key);
          } else {
            next.set(key, String(value));
          }
        });
        return next;
      },
      { replace }
    );
  };

  // The hook fetches the list. If ?page=999 is too high, we move to the last page.
  const { products, total, loading, error, reload } = useProducts(params, (lastPage) =>
    updateParams({ page: lastPage }, true)
  );

  // Load categories once
  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((err) => toast.error(err.message));
  }, []);

  // ---- URL handlers (every filter change goes back to page 1) ----
  const handleSearch = (text) => {
    // Search and category cannot work together, so searching clears the category
    if (text) {
      updateParams({ q: text, category: '', page: 1 });
    } else {
      updateParams({ q: '', page: 1 });
    }
  };

  const handleCategory = (slug) => {
    // Choosing a category clears the search text
    updateParams({ category: slug, q: '', page: 1 });
  };

  const handleSort = (value) => {
    const [newSortBy, newOrder] = value.split(':');
    updateParams({ sortBy: newSortBy, order: newOrder, page: 1 });
  };

  const handlePageChange = (newPage) => {
    updateParams({ page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    updateParams({ q: '', category: '', sortBy: '', order: '', page: '' });
  };

  // ---- Add / Edit ----
  const openAddForm = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const openEditForm = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleSave = async (values) => {
    try {
      if (editingProduct) {
        // Products created by us do not exist on the server, so skip the API call
        if (!isLocalProduct(editingProduct.id)) {
          await updateProduct(editingProduct.id, values);
        }
        editLocalProduct(editingProduct, values);
        toast.success('Product updated');
      } else {
        await addProduct(values);
        addLocalProduct(values);
        toast.success('Product added');
      }
      closeForm();
      reload();
    } catch (err) {
      toast.error(err.message);
    }
  };

  // ---- Delete ----
  const handleConfirmDelete = async () => {
    if (deleteLock.current) return;
    deleteLock.current = true;
    setDeleteLoading(true);
    try {
      if (!isLocalProduct(deletingProduct.id)) {
        await deleteProduct(deletingProduct.id);
      }
      deleteLocalProduct(deletingProduct.id);
      toast.success('Product deleted');
      setDeletingProduct(null);
      reload();
    } catch (err) {
      toast.error(err.message);
    } finally {
      deleteLock.current = false;
      setDeleteLoading(false);
    }
  };

  // ---- What to show ----
  const renderContent = () => {
    if (loading) return <ProductSkeleton />;
    if (error) return <ErrorMessage message={error} onRetry={reload} />;
    if (products.length === 0) {
      return <EmptyState message="No products found." onClear={hasFilters ? clearFilters : null} />;
    }

    return (
      <>
        <ProductList products={products} onEdit={openEditForm} onDelete={setDeletingProduct} />
        <Pagination
          page={page}
          limit={limit}
          total={total}
          onPageChange={handlePageChange}
          onLimitChange={(newLimit) => updateParams({ limit: newLimit, page: 1 })}
        />
      </>
    );
  };

  return (
    <main className="mx-auto max-w-7xl p-4">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500">
            {!loading && !error ? `${total} products in your catalog` : 'Manage your catalog'}
          </p>
        </div>
        <button
          onClick={openAddForm}
          className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm transition hover:bg-indigo-700"
        >
          <PlusIcon /> Add Product
        </button>
      </div>

      <div className="mb-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <p className={labelClass}>Search</p>
            <SearchBar value={q} onSearch={handleSearch} />
          </div>
          <div>
            <p className={labelClass}>Category</p>
            <CategoryFilter value={category} categories={categories} onChange={handleCategory} />
          </div>
          <div>
            <p className={labelClass}>Sort by</p>
            <SortSelect value={sortBy ? `${sortBy}:${order}` : ''} onChange={handleSort} />
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            Note: the API cannot search and filter by category together, so choosing one clears the other.
          </p>
          {hasFilters && (
            <button onClick={clearFilters} className="text-xs font-medium text-indigo-600 hover:underline">
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {renderContent()}

      {showForm && (
        <ProductForm product={editingProduct} categories={categories} onSubmit={handleSave} onClose={closeForm} />
      )}

      {deletingProduct && (
        <ConfirmModal
          title="Delete product?"
          message={`Are you sure you want to delete "${deletingProduct.title}"?`}
          loading={deleteLoading}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingProduct(null)}
        />
      )}
    </main>
  );
};

export default ProductsPage;