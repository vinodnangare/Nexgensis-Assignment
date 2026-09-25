import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import { getProductById } from '../api/productApi';
import { applyEditToProduct, getLocalProduct, isDeleted, isLocalProduct } from '../utils/localChanges';
import { formatPrice } from '../utils/format';
import DetailSkeleton from '../Component/DetailSkeleton';
import ErrorMessage from '../Component/ErrorMessage';
import CategoryBadge from '../Component/CategoryBadge';
import Rating from '../Component/Rating';
import StockBadge from '../Component/StockBadge';
import NotFoundPage from './NotFoundPage';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const loadProduct = async () => {
      setLoading(true);
      setError('');
      setNotFound(false);
      setSelectedImage(0);

      // Wrong id like /products/abc, or a product we deleted locally
      if (Number.isNaN(Number(id)) || isDeleted(id)) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        if (isLocalProduct(id)) {
          setProduct(getLocalProduct(id)); // product we added ourselves
        } else {
          const data = await getProductById(id, controller.signal);
          setProduct(applyEditToProduct(data));
        }
        setLoading(false);
      } catch (err) {
        if (axios.isCancel(err)) return;
        if (err.status === 404) {
          setNotFound(true);
        } else {
          setError(err.message);
        }
        setLoading(false);
      }
    };

    loadProduct();
    return () => controller.abort();
  }, [id, reloadKey]);

  if (loading) return <DetailSkeleton />;
  if (notFound) return <NotFoundPage />;
  if (error) {
    return (
      <div className="mx-auto max-w-3xl p-4">
        <ErrorMessage message={error} onRetry={() => setReloadKey((key) => key + 1)} />
      </div>
    );
  }

  const images = product.images?.length ? product.images : product.thumbnail ? [product.thumbnail] : [];
  const reviews = product.reviews || [];
  const tags = product.tags || [];
  const discount = Math.round(product.discountPercentage || 0);

  // Only show the info that exists (products we add ourselves do not have these)
  const infoItems = [
    { label: 'Shipping', value: product.shippingInformation },
    { label: 'Warranty', value: product.warrantyInformation },
    { label: 'Returns', value: product.returnPolicy },
  ].filter((item) => item.value);

  return (
    <main className="mx-auto max-w-5xl p-4">
      <Link
        to="/products"
        className="inline-block rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
      >
        ← Back to products
      </Link>

      <div className="animate-fade-in mt-4 grid gap-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:grid-cols-2">
        <div>
          {images.length > 0 ? (
            <>
              <img
                src={images[selectedImage]}
                alt={product.title}
                className="h-80 w-full rounded-lg border border-gray-200 bg-gray-50 object-contain"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.title} ${index + 1}`}
                    onClick={() => setSelectedImage(index)}
                    className={`h-16 w-16 cursor-pointer rounded-lg border-2 bg-gray-50 object-cover transition hover:opacity-80 ${
                      index === selectedImage ? 'border-indigo-600' : 'border-gray-200'
                    }`}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="flex h-80 items-center justify-center rounded-lg bg-gray-100 text-gray-400">No image</div>
          )}
        </div>

        <div>
          <CategoryBadge category={product.category} />
          <h1 className="mt-2 text-2xl font-bold text-gray-900">{product.title}</h1>
          {product.brand && <p className="text-sm text-gray-500">by {product.brand}</p>}

          <div className="mt-3 flex items-center gap-3">
            <p className="text-3xl font-bold text-indigo-600">{formatPrice(product.price)}</p>
            {discount > 0 && (
              <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-600 ring-1 ring-inset ring-red-200">
                {discount}% OFF
              </span>
            )}
          </div>

          <div className="mt-3 flex items-center gap-3">
            <Rating value={product.rating} />
            <StockBadge stock={product.stock} />
          </div>

          <p className="mt-5 leading-relaxed text-gray-700">{product.description}</p>

          {tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {infoItems.length > 0 && (
            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              {infoItems.map((item) => (
                <div key={item.label} className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <p className="text-xs font-semibold uppercase text-gray-500">{item.label}</p>
                  <p className="mt-0.5 text-sm text-gray-800">{item.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <section className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold text-gray-900">Reviews ({reviews.length})</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="flex gap-3 border-t border-gray-100 py-3 first:border-t-0">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold uppercase text-indigo-700">
                {review.reviewerName?.[0] || '?'}
              </span>
              <div>
                <p className="font-medium text-gray-900">
                  {review.reviewerName} <Rating value={review.rating} />
                </p>
                <p className="text-gray-700">{review.comment}</p>
                <p className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
};

export default ProductDetailPage;