import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import Navbar from '../components/navbar/Navbar';
import { registerUser } from '../services/auth/register';

const Register = () => {
  const [inputs, setInputs] = useState({
    user_name: '',
    email: '',
    password: '',
  });

  // const [err, setErr] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await registerUser(inputs);
      if (!authContext) {
        console.error('could get auth context');
        throw new Error('couldnt get auth context');
      }

      const loginInputs = {
        user_name: inputs.user_name,
        password: inputs.password,
      };
      await authContext.login(loginInputs);
      navigate('/');
    } catch (err) {
      alert('error occured with registration');
      console.error('register user error object: ', err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="registration-container text-sage-gray flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="text-center mt-10 font-semibold tracking-tight">
            Registration
          </h1>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleClick}>
            <div className="mt-2">
              <input
                type="text"
                placeholder="username"
                name="user_name"
                onChange={handleChange}
                className="block w-full bg-dark-gray  rounded-md px-3 py-1.5 focus-outline-2 sm:text-sm/6"
              />
            </div>
            <div className="mt-2">
              <input
                type="email"
                placeholder="email"
                name="email"
                onChange={handleChange}
                className="block w-full bg-dark-gray rounded-md px-3 py-1.5 focus-outline-2 sm:text-sm/6"
              />
            </div>
            <div className="mt-2 ">
              <input
                type="password"
                placeholder="password"
                name="password"
                onChange={handleChange}
                className="block w-full bg-dark-gray rounded-md px-3 py-1.5 focus-outline-2 sm:text-sm/6"
              />
            </div>

            <div className="mt-5">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-dark-gray px-3 py-1.5 text-sm/6 font-semibold shadow-xs hover:text-dark-gray hover:bg-sage-gray focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-gray"
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 font-semibold hover:text-bright-gray">
            <Link to="/login">
              <span className="login-tex ">already have an account?</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
