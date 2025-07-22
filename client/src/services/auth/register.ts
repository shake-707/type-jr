import axios from 'axios';

type registerInputs = {
  user_name: string;
  email: string;
  password: string;
};

export const registerUser = async (inputs: registerInputs): Promise<void> => {
  try {
    const response = await axios.post('api/register', inputs);
    console.log('data from registering user', response.data);
  } catch (err) {
    //alert('error registering user');
    console.log('error objust from registerUser', err);
    throw err;
  }
};
