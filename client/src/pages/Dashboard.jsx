import { Link } from 'react-router-dom';
import Story from '../components/Story';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="p-3 max-w-7xl mx-auto">
      {/* <h1 className='text-3xl font-semibold text-center my-7'>
        Hello, this is {currentUser.username}'s Dashboard
      </h1> */}
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/4 p-3 lg:flex lg:flex-col lg:items-start lg:gap-4">
          <Link to='/profile' className=" text-green-500 font-bold p-3 rounded-lg uppercase hover:opacity-95">
            Go to my Profile
          </Link>
        </div>
        <div className="w-2/4 p-3">
          <Story />
        </div>
        <div className="mt-4 font-bold text-center">
          <Link to="/stories" className="text-green-500 uppercase hover:opacity-95">
            Go to my Saved Stories
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;