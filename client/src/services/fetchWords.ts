import axios from 'axios';
import type { categories } from './fetchTestCategories';


type categoryProp = {
  category: categories
  option: number;
};

export const getWords = async ({
  category,
  option,
}: categoryProp): Promise<string[]> => {
  try {
    const response = await axios.get<string[]>('/api/getWords', {
      params: { category, option },
    });
    return response.data
  } catch (err) {
    throw err;
  }
};
