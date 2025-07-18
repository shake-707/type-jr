type categories = 'count' | 'time';

export const handleTestSelection = (
  category: categories,
  option: { length: number; label: string }
) => {
  if (category === 'count') {
    return option.length;
  } else if (category === 'time') {
    return option.length;
  }
};
