import BackgroundImage from './BackgroundImage.jsx';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="h-screen">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-red-300 text-center mb-4">
          Welcome to Story Wonderland!!📙🌀䷉ <br/> 
          A World of Creative Stories of All Kind!!
        </h1>
        <p className='text-white text-center' > Click here :-
          <Link to="/sign-in" className="ml-2 mr-2 text-blue-500 hover:underline uppercase">
            Signup/Signin 
          </Link> to get started!
        </p>
        <BackgroundImage />
      </div>
    </div>
  );
};

export default Home;