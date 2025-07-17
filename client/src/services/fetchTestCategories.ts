import axios from 'axios';

type categories = 'count' | 'time';

type testCategoriesResponseData = {
  category: categories;
  options: {
    length: number;
    label: string;
  }[];
};

export const fetchTestCategories = async () => {
  try {
    const response = await axios.get<testCategoriesResponseData[]>(
      '/api/test-categories'
    );
    return response.data;
  } catch (err) {
    console.error('error test categories api', err);
    throw err;
  }
};
