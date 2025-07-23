import axios from 'axios';

export type categories = 'count' | 'time';

export type testCategoriesResponseData = {
  category: categories;
  options: {
    length: number;
    label: string;
  }[];
};



export const fetchTestCategories = async (): Promise<testCategoriesResponseData[]> => {
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
