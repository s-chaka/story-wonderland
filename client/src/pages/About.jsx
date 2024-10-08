import React from 'react';

const About = () => {
  return (
    <div className='min-h-screen bg-gradient-to-r from-purple-200 via-blue-200 to-red-200 bg-opacity-60 backdrop-filter backdrop-blur-lg flex items-center justify-center'>
    <div className='p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg mt-10'>
      <h1 className='text-3xl font-bold text-center text-purple-400 mb-4 mt-8'>
        About Story Wonderland App
      </h1>
      <p className='text-lg text-gray-700 mb-6 mt-10'>
          Welcome to Story Wonderland, a magical place where your imagination takes center stage! 
        This app is specially made for kids under 10 years old, offering fun and exciting stories 
        that you can create based on your favorite genres. With the help of our friendly AI, 
        we bring your chosen adventures to life in a way that’s just for you.
      </p>
      <h2 className='text-2xl font-bold text-center text-purple-400 mb-4 mt-8'>
        How It Works
      </h2>
      <p className='text-lg text-gray-700 mb-6'>
          Creating your own story in Story-Wonderland is as easy as picking the types of stories you 
        like whether it’s fairy tales, space adventures, or anything in between. Once you’ve made 
        your choice, our app puts together a fun story for you to enjoy. You can save your favorite stories, 
        explore different paths, and let your imagination run wild!
      </p>
      <h2 className='text-2xl font-bold text-center text-purple-400 mb-4 mt-8'>
        Our Mission
      </h2>
      <p className='text-lg text-gray-700 mb-6'>
          We believe that every child has a story to tell. Story Wonderland is here to inspire creativity 
        and make reading and storytelling a fun experience for kids everywhere. Our app is designed to be 
        a safe and delightful place where young minds can explore and grow.
      </p>
      <h2 className='text-2xl font-bold text-center text-purple-400 mb-4 mt-8'>
        Technology Behind the Magic
      </h2>
      <p className='text-lg text-gray-700'>
          Story-Wonderland uses the MERN stack and llama API to create personalized stories for each child. 
        We’ve made sure that our app is easy to use, so kids can focus on what matters most having fun!
      </p>
      <h2 className='text-2xl font-bold text-center text-purple-400 mb-4 mt-8'>
  Our Team
</h2>
<p className='text-lg text-gray-700'>
  We are a team of passionate and creative developers, and you can find us on LinkedIn:  
  <br />
  <a 
    href='https://www.linkedin.com/in/semhar-tes/' 
    className='text-purple-500 hover:underline ml-1' 
    target='_blank' 
    rel='noopener noreferrer'
  >
    Semhar Tesfmariam
  </a>
  {' and '}
  <a 
    href='https://www.linkedin.com/in/selam-chaka/' 
    className='text-purple-500 hover:underline' 
    target='_blank' 
    rel='noopener noreferrer'
  >
    Selam Chaka
  </a>.
</p>
    </div>
    </div>
  );
};

export default About;
