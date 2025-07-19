import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import Navbar from '../components/navbar/Navbar';

const Login = () => {
  const [inputs, setInputs] = useState({
    user_name: '',
    password: '',
  });

  // will use when implementing css for ui errors
  // const [uiError, setUiError] = useState<string>('');

  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const authContext = useContext(AuthContext);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!authContext) {
      console.error('failed to get auth context');
      return;
    }
    try {
      await authContext.login(inputs);
      navigate('/');
    } catch (err) {
      alert('error logging in');
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container text-sage-gray flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="text-center mt-10 font-semibold tracking-tight">
            Login
          </h1>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin}>
            <div className="mt-2">
              <input
                type="text"
                placeholder="username"
                name="user_name"
                onChange={handleChange}
                className="block w-full bg-dark-gray  rounded-md px-3 py-1.5 sm:text-sm/6 focus:outline-1 focus:outline-bright-gray"
              />
            </div>
            <div className="mt-2">
              <input
                type="password"
                placeholder="password"
                name="password"
                onChange={handleChange}
                className="block w-full bg-dark-gray  rounded-md px-3 py-1.5 focus:outline-1 focus:outline-bright-gray sm:text-sm/6"
              />
            </div>

            <div className="mt-5">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-dark-gray px-3 py-1.5 text-sm/6 font-semibold shadow-xs hover:text-dark-gray hover:bg-sage-gray focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-gray"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 font-semibold hover:text-bright-gray">
            <Link to="/register">
              <span className="register-text">need an account?</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
