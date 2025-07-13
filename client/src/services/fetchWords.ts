import axios from 'axios';

type getWordsResponse = {
    word: string 
}

export const getWords = async (): Promise<string[]> => {
  try {
    const response = await axios.get<getWordsResponse[]>('/api/getWords');
    return response.data.map(item => item.word);
  } catch (err) {
    throw err;
  }
};
