// Tailwind only creates classes it can see written in full, so every color is a full string.
const COLORS = [
  'bg-indigo-50 text-indigo-700 ring-indigo-200',
  'bg-emerald-50 text-emerald-700 ring-emerald-200',
  'bg-rose-50 text-rose-700 ring-rose-200',
  'bg-amber-50 text-amber-700 ring-amber-200',
  'bg-sky-50 text-sky-700 ring-sky-200',
  'bg-purple-50 text-purple-700 ring-purple-200',
  'bg-teal-50 text-teal-700 ring-teal-200',
  'bg-orange-50 text-orange-700 ring-orange-200',
  'bg-pink-50 text-pink-700 ring-pink-200',
  'bg-lime-50 text-lime-700 ring-lime-200',
  'bg-cyan-50 text-cyan-700 ring-cyan-200',
  'bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-200',
];

// Add up the character codes of the category name, then use % to pick a color.
// The same category always gives the same number, so it always gets the same color.
const getCategoryColor = (category = '') => {
  let sum = 0;
  for (let i = 0; i < category.length; i++) {
    sum += category.charCodeAt(i);
  }
  return COLORS[sum % COLORS.length];
};

export { getCategoryColor };