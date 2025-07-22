import axios from 'axios';

type getWordsResponse = {
  word: string;
};

type categoryProp = {
  category: 'time' | 'count';
  option: number;
};

export const getWords = async ({
  category,
  option,
}: categoryProp): Promise<string[]> => {
  try {
    const response = await axios.get<getWordsResponse[]>('/api/getWords', {
      params: { category, option },
    });
    return response.data.map((item) => item.word);
  } catch (err) {
    throw err;
  }
};
