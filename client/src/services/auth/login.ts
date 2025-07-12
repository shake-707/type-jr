import axios from 'axios';

type loginInputs = {
  user_name: string;
  password: string;
};

export const loginUser = async (inputs: loginInputs): Promise<string> => {
  try {
    const response = await axios.post<string>('/api/login', inputs, { withCredentials: true});
    console.log('data from login', response.data);
    return response.data;
  } catch (err) {
    alert('error logging in');
    console.error(err);
    throw err;
  }
};
