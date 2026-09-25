import { StarIcon } from './Icons';

const Rating = ({ value }) => {
  return (
    <span className="inline-flex items-center gap-1 text-sm font-medium text-gray-700">
      <span className="text-amber-400">
        <StarIcon />
      </span>
      {value}
    </span>
  );
};

export default Rating;