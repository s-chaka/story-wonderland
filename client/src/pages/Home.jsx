import BackgroundImage from './BackgroundImage.jsx';

const Home = () => {
  return (
    <div className="h-screen relative ">
      <BackgroundImage />

      {/* Moving Clouds */}
      <div className="absolute top-10 left-0 w-48 h-24 bg-white opacity-65 rounded-full blur-md animate-float"></div>
      <div className="absolute top-40 right-0 w-32 h-16 bg-white opacity-65 rounded-full blur-md animate-float-slow"></div>
      <div className="absolute top-20 left-1/3 w-56 h-28 bg-white opacity-65 rounded-full blur-md animate-float"></div>

      {/* Floating Leaves */}
      <div className="absolute top-10 left-10 w-8 h-8 bg-green-600 rounded-full leaf-style opacity-75 animate-leaf"></div>
      <div className="absolute top-20 right-20 w-10 h-10 bg-green-500 rounded-full leaf-style opacity-75 animate-leaf-slow"></div>
      <div className="absolute top-40 left-1/4 w-8 h-8 bg-green-700 rounded-full leaf-style opacity-75 animate-leaf"></div>

      {/* Content  */}
      <div className="flex flex-col items-center justify-center h-full z-10 relative">
        <h1 className="text-center text-5xl font-bold text-white drop-shadow-md hover:animate-move-on-hover">Story Wonderland!📙</h1>
        <a href="/sign-up" className="mt-10 bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 text-white py-3 px-6 rounded-full text-xl hover:scale-105 transition-transform block text-center">
          SignUp here <br /> To Start Your Adventure!🚀
        </a>
      </div>
      <style>
        {`       
          .leaf-style {
              clip-path: polygon(50% 0%, 70% 25%, 90% 50%, 70% 75%, 50% 100%, 30% 75%, 10% 50%, 30% 25%);}
        `}
      </style>
    </div>
  );
};

export default Home;

