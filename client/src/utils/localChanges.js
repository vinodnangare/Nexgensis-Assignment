// The API does not really save add/edit/delete.
// So we save the changes in localStorage and apply them on top of the API data.
const KEY = 'productChanges';

const readChanges = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    return {
      added: saved?.added || [],
      edited: saved?.edited || {},
      deleted: saved?.deleted || [],
    };
  } catch {
    return { added: [], edited: {}, deleted: [] };
  }
};

const writeChanges = (changes) => {
  localStorage.setItem(KEY, JSON.stringify(changes));
};

// Turns form values into product fields.
// "images" is only replaced when the image URL really changed.
const toFields = (data, oldProduct = {}) => {
  const fields = {
    title: data.title,
    description: data.description,
    category: data.category,
    price: data.price,
    stock: data.stock,
    thumbnail: data.image,
  };
  if (data.image !== oldProduct.thumbnail) {
    fields.images = data.image ? [data.image] : [];
  }
  return fields;
};

const isLocalProduct = (id) => readChanges().added.some((p) => p.id === Number(id));

const getLocalProduct = (id) => readChanges().added.find((p) => p.id === Number(id));

const isDeleted = (id) => readChanges().deleted.includes(Number(id));

const addLocalProduct = (data) => {
  const changes = readChanges();
  const newProduct = {
    id: Date.now(), // unique id, so it never clashes with API ids
    rating: 0,
    reviews: [],
    ...toFields(data),
  };
  writeChanges({ ...changes, added: [newProduct, ...changes.added] });
};

const editLocalProduct = (product, data) => {
  const changes = readChanges();
  const fields = toFields(data, product);

  if (isLocalProduct(product.id)) {
    const added = changes.added.map((p) => (p.id === product.id ? { ...p, ...fields } : p));
    writeChanges({ ...changes, added });
  } else {
    const edited = { ...changes.edited, [product.id]: { ...changes.edited[product.id], ...fields } };
    writeChanges({ ...changes, edited });
  }
};

const deleteLocalProduct = (id) => {
  const changes = readChanges();
  if (isLocalProduct(id)) {
    writeChanges({ ...changes, added: changes.added.filter((p) => p.id !== id) });
  } else {
    writeChanges({ ...changes, deleted: [...changes.deleted, id] });
  }
};

// Used on the detail page
const applyEditToProduct = (product) => {
  const changes = readChanges();
  return { ...product, ...changes.edited[product.id] };
};

// Used on the list page: remove deleted, replace edited, add new ones on top
const applyLocalChanges = (products, showAdded) => {
  const changes = readChanges();
  const list = products
    .filter((p) => !changes.deleted.includes(p.id))
    .map((p) => ({ ...p, ...changes.edited[p.id] }));
  return showAdded ? [...changes.added, ...list] : list;
};

// Keeps "Showing 1-10 of N" correct after add/delete
const getTotalAdjustment = () => {
  const changes = readChanges();
  return changes.added.length - changes.deleted.length;
};

export {
  isLocalProduct,
  getLocalProduct,
  isDeleted,
  addLocalProduct,
  editLocalProduct,
  deleteLocalProduct,
  applyEditToProduct,
  applyLocalChanges,
  getTotalAdjustment,
};