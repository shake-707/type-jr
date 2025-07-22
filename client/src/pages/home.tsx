import Navbar from '../components/navbar/Navbar';
import { TestBox } from '../components/test-box/TestBox';

const Home = () => {
  return (
    <div className='min-h-screen'>
      <Navbar />
      <h1 className="text-sage-gray">Home Page From Pages</h1>
      <TestBox />
    </div>
  );
};

export default Home;
