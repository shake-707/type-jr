import axios from 'axios';

export type testResultsData = {
    total_words_typed: number,
    correct_words_typed: number,
    total_chars_typed: number,
    correct_chars_typed: number,
    wpm: number,
    accuracy:number,
    label: string
}


export const getUserTestResults = async (user_name: string): Promise<testResultsData[]> => {
  try {
    const testResults = await axios.get<testResultsData[]>('/api/testResults', {
      params: { user_name },
    });

    return testResults.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
