import axiosInstance from './axiosInstance';

const getProducts = ({ page, limit, q, category, sortBy, order }, signal) => {
  const params = { limit, skip: (page - 1) * limit };
  let url = '/products';

  // The API cannot search and filter by category together.
  // Search wins if both are somehow in the URL.
  if (q) {
    url = '/products/search';
    params.q = q;
  } else if (category) {
    url = `/products/category/${encodeURIComponent(category)}`;
  }

  if (sortBy) {
    params.sortBy = sortBy;
    params.order = order;
  }

  return axiosInstance.get(url, { params, signal }).then((res) => res.data);
};

const getCategories = () => axiosInstance.get('/products/categories').then((res) => res.data);

const getProductById = (id, signal) =>
  axiosInstance.get(`/products/${id}`, { signal }).then((res) => res.data);

const addProduct = (data) => axiosInstance.post('/products/add', data).then((res) => res.data);

const updateProduct = (id, data) => axiosInstance.put(`/products/${id}`, data).then((res) => res.data);

const deleteProduct = (id) => axiosInstance.delete(`/products/${id}`).then((res) => res.data);

export { getProducts, getCategories, getProductById, addProduct, updateProduct, deleteProduct };