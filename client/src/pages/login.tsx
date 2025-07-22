import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import Navbar from '../components/navbar/Navbar';
import { Alert } from '../components/alert/Alert';
import type { AlertProp } from '../components/alert/Alert';

let alertData: AlertProp = {
  alertType: 'success',
  message: '',
};

const Login = () => {
  const [inputs, setInputs] = useState({
    user_name: '',
    password: '',
  });

  // will use when implementing css for ui errors
  // const [uiError, setUiError] = useState<string>('');

  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleError = (messagge: string) => {
    alertData.alertType = 'error';
    alertData.message = messagge;
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
  };

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
    if (inputs.password.length < 7) {
      handleError('password too short');
      return;
    }
    try {
      await authContext.login(inputs);
      navigate('/');
    } catch (err) {
      handleError('failed to register');
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      {showAlert && <Alert alertType={alertData.alertType} message={alertData.message} />}
      <div className="login-container text-sage-gray flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="text-center mt-10 font-semibold tracking-tight">
            Login
          </h1>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin}>
            <div className="relative mt-6">
              <input
                type="text"
                id="user_name"
                name="user_name"
                placeholder=" "
                value={inputs.user_name}
                onChange={handleChange}
                className="peer h-13 block w-full bg-dark-gray  rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-sage-gray sm:text-sm"
              />
              <label
                htmlFor="user_name"
                className={`
                absolute left-3 transition-all duration-200 
                ${inputs.user_name ? 'top-1 text-sm text-sage-gray' : 'top-3 text-base text-gray-500'}
                peer-focus:top-1 peer-focus:text-sm peer-focus:text-sage-gray
              `}
              >
                username
              </label>
            </div>

             <div className="relative mt-6">
              <input
                type="password"
                id="password"
                name="password"
                placeholder=" "
                value={inputs.password}
                onChange={handleChange}
                className="peer h-13 block w-full bg-dark-gray  rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-sage-gray sm:text-sm"
              />
              <label
                htmlFor="password"
                className={`
                absolute left-3 transition-all duration-200 
                ${inputs.password ? 'top-1 text-sm text-sage-gray' : 'top-3 text-base text-gray-500'}
                peer-focus:top-1 peer-focus:text-sm ${inputs.password.length < 7 ? 'peer-focus:text-red-300' : 'peer-focus:text-sage-gray'}
              `}
              >
                password
              </label>
            </div>

            {/* <div className="relative mt-6">
              <input
                type="password"
                id="password"
                name="password"
                placeholder=" "
                value={inputs.password}
                onChange={handleChange}
                className="peer h-13 block w-full bg-dark-gray  rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-sage-gray sm:text-sm"
              />
              <label
                htmlFor="password"
                className={`
                absolute left-3 transition-all duration-200 
                ${inputs.password ? 'top-1 text-sm text-sage-gray' : 'top-3 text-base text-gray-500'}
                peer-focus:top-1 peer-focus:text-sm peer-focus:text-sage-gray
              `}
              >
                password
              </label>
            </div> */}

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
