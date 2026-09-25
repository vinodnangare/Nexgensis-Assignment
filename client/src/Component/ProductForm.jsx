import { useRef, useState } from 'react';
import FormField from './FormField';
import { formatCategory } from '../utils/format';

const inputClass =
  'w-full rounded-lg border border-gray-300 px-3 py-2 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200';

const validate = (values) => {
  const errors = {};
  if (values.title.trim().length < 3) errors.title = 'Title must be at least 3 characters';
  if (values.description.trim().length < 10) errors.description = 'Description must be at least 10 characters';
  if (!values.category) errors.category = 'Please choose a category';
  if (!(Number(values.price) > 0)) errors.price = 'Price must be greater than 0';
  if (values.stock === '' || !Number.isInteger(Number(values.stock)) || Number(values.stock) < 0) {
    errors.stock = 'Stock must be a whole number (0 or more)';
  }
  if (values.image.trim() && !/^https?:\/\//i.test(values.image.trim())) {
    errors.image = 'Image URL must start with http:// or https://';
  }
  return errors;
};

// product = null means "Add", product = object means "Edit"
const ProductForm = ({ product, categories, onSubmit, onClose }) => {
  const [values, setValues] = useState({
    title: product?.title || '',
    description: product?.description || '',
    category: product?.category || '',
    price: product?.price ?? '',
    stock: product?.stock ?? '',
    image: product?.thumbnail || '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const isSubmitting = useRef(false); // instant lock, state updates are not instant

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting.current) return; // ignore extra clicks

    const foundErrors = validate(values);
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) return;

    isSubmitting.current = true;
    setSubmitting(true);
    try {
      await onSubmit({
        title: values.title.trim(),
        description: values.description.trim(),
        category: values.category,
        price: Number(values.price),
        stock: Number(values.stock),
        image: values.image.trim(),
      });
    } finally {
      isSubmitting.current = false;
      setSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 sm:items-center">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="animate-pop w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
      >
        <h2 className="mb-4 text-xl font-semibold text-gray-900">{product ? 'Edit Product' : 'Add Product'}</h2>

        <FormField label="Title" error={errors.title}>
          <input name="title" value={values.title} onChange={handleChange} className={inputClass} />
        </FormField>

        <FormField label="Description" error={errors.description}>
          <textarea
            name="description"
            rows="3"
            value={values.description}
            onChange={handleChange}
            className={inputClass}
          />
        </FormField>

        <FormField label="Category" error={errors.category}>
          <select
            name="category"
            value={values.category}
            onChange={handleChange}
            className={`${inputClass} capitalize`}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {formatCategory(cat.slug)}
              </option>
            ))}
          </select>
        </FormField>

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Price ($)" error={errors.price}>
            <input
              name="price"
              type="number"
              step="0.01"
              value={values.price}
              onChange={handleChange}
              className={inputClass}
            />
          </FormField>
          <FormField label="Stock" error={errors.stock}>
            <input name="stock" type="number" value={values.stock} onChange={handleChange} className={inputClass} />
          </FormField>
        </div>

        <FormField label="Image URL (optional)" error={errors.image}>
          <input name="image" value={values.image} onChange={handleChange} className={inputClass} />
        </FormField>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-50"
          >
            {submitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;