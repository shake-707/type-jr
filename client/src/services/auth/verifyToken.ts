import axios from 'axios';

export const verifyToken = async () => {
  try {
    const storedToken = localStorage.getItem('token');

    if (!storedToken) {
      return;
    }

    const response = await axios.get('/api/verify-token',{
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
   
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
