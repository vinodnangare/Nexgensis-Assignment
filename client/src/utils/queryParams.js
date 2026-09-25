const PAGE_SIZES = [10, 20, 50];
const SORT_FIELDS = ['price', 'rating', 'title'];

// Reads the URL and always returns safe values
const readParams = (searchParams) => {
  const pageNumber = parseInt(searchParams.get('page'), 10);
  const page = Number.isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber;

  const limitNumber = parseInt(searchParams.get('limit'), 10);
  const limit = PAGE_SIZES.includes(limitNumber) ? limitNumber : 10;

  const q = (searchParams.get('q') || '').trim();
  const category = searchParams.get('category') || '';

  const sortByValue = searchParams.get('sortBy');
  const sortBy = SORT_FIELDS.includes(sortByValue) ? sortByValue : '';
  const order = searchParams.get('order') === 'desc' ? 'desc' : 'asc';

  return { page, limit, q, category, sortBy, order };
};

export { PAGE_SIZES, SORT_FIELDS, readParams };