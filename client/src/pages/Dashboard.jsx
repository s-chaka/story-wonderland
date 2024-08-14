import { Link } from 'react-router-dom';
import Story from '../components/Story';

const Dashboard = () => {

  return (  
    <div className="h-screen bg-gradient-to-r from-purple-200 via-blue-200 to-red-200 bg-opacity-60 backdrop-filter backdrop-blur-lg items-center justify-center"> 
    <div className="p-3 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/4 p-3 lg:flex lg:flex-col lg:items-start lg:gap-4">
          <Link to='/profile' className=" text-black font-bold p-3 rounded-lg uppercase hover:bg-green-200  hover:opacity-95">
            Go to my Profile
          </Link>
        </div>
        <div className="w-2/4 p-3">
          <Story />
        </div>
        <div className="mt-4 font-bold text-center">
          <Link to="/stories" className=" text-black font-bold p-3 rounded-lg uppercase hover:bg-green-200  hover:opacity-95">
            Go to my Saved Stories
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;