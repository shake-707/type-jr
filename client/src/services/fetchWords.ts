import axios from 'axios';


type categoryProp = {
  category: 'time' | 'count';
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
