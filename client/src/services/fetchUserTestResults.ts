import axios from 'axios';

export const getUserTestResults = async (user_name: string) => {
  try {
    const testResults = await axios.get('/api/testResults', {
      params: { user_name },
    });

    console.log(testResults.data);
    return testResults.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
