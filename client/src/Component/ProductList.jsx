import useMediaQuery from '../hooks/useMediaQuery';
import ProductTable from './ProductTable';
import ProductCard from './ProductCard';

const ProductList = ({ products, onEdit, onDelete }) => {
  // 768px is Tailwind's "md" breakpoint
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <div className="animate-fade-in">
        <ProductTable products={products} onEdit={onEdit} onDelete={onDelete} />
      </div>
    );
  }

  return (
    <div className="animate-fade-in grid gap-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default ProductList;