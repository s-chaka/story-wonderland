import BackgroundImage from './BackgroundImage.jsx';

const Home = () => {
  return (
    <body className="h-screen">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-red-300 text-center mb-4">
          Welcome to Story Wonderland!!📙🌀䷉ <br/> 
          A World of Creative Stories of All Kind!!
        </h1>
        <a href="/sign-up" className="text-blue-500 hover:underline">
          Signup here to get started!
        </a>
        <BackgroundImage />
      </div>
    </body>
  );
};

export default Home;