import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-4 text-center">
      <h1 className="bg-linear-to-br from-indigo-600 to-purple-600 bg-clip-text text-7xl font-extrabold text-transparent">
        404
      </h1>
      <p className="mt-3 text-gray-600">Sorry, we could not find what you are looking for.</p>
      <Link
        to="/products"
        className="mt-5 rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-700"
      >
        Back to products
      </Link>
    </div>
  );
};

export default NotFoundPage;