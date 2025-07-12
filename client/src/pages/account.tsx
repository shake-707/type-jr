import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import Navbar from '../components/navbar/navbar';

const Account = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('couldnt get auth context');
  }

  const { currentUser, loading } = authContext;
  useEffect(() => {
    if (!loading && !currentUser) {
      console.log('not logged in');
      navigate('/login');
      return;
    }
  }, [loading, currentUser, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <h1 className="text-sage-gray">
        Account Page: Welcome {currentUser?.user_name}
      </h1>
    </>
  );
};

export default Account;
