import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

const StoryGenerator = () => {
  const [genre, setGenre] = useState('');
  const [story, setStory] = useState('');
  const [choices, setChoices] = useState([]);

  const handleGenreChange = (e) => setGenre(e.target.value);

  const generateStory = async () => {
    try {
      const response = await axios.post('/api/generate-story', { genre });
      const {segment, choices} = response.data;
      
      setStory(segment);
      setChoices(choices);
    } catch (error) {
      console.error("Error generating story:", error.response?.data || error.message || error);  // Log detailed error
    }
  };

  const continueStory = async (choice) => {
    try {
      const response = await axios.post('/api/continue-story', { choice });
      const { segment, choices } = response.data;

      setStory((prev) => `${prev}\n\n${segment}`);
      setChoices(choices);
    } catch (error) {
      console.error('Error continuing story:', error.response?.data || error.message || error);
    }
  };

  return (
    <div className='p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4'>
      <h1 className='text-2xl text-center font-semibold my-7'>Story Generator</h1>
      <select value={genre} onChange={handleGenreChange} className='block w-full p-2 border border-gray-300 rounded-md'>
        <option value="">Select Genre</option>
        <option value="fantasy">Fantasy</option>
        <option value="sci-fi">Sci-Fi</option>
        <option value="mystery">Mystery</option>
        <option value="family">Family</option>
      </select>
      <button 
        onClick={generateStory} 
        className='w-full p-2 mt-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-300'
      >
        Generate Story
      </button>

      <p className='mt-4 text-gray-700'>{story}</p>
      <div className='space-y-2'>
        {choices.map((choice, index) => (
          <button 
            key={index} 
            onClick={() => continueStory(choice)} 
            className='w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300'
          >
            {choice}
          </button>
        ))}
      </div>
    </div> 
  );
};

export default StoryGenerator;

// export default function Home() {
//   // const [message, setMessage] = useState('');
//   // useEffect(() => {
//   //   // Function to fetch data from the /test endpoint
//   //   const fetchData = async () => {
//   //     try {
//   //       const response = await axios.get('/test');
//   //       console.log('Data:', response.data);
//   //       setMessage(response.data);
//   //     } catch (error) {
//   //       console.error('Error fetching data:', error);
//   //       setMessage('Error fetching data');
//   //     }
//   //   };
  
//   //   fetchData();
//   // }, []);
//   return (
//     <div>
//       <h1>Home</h1>
//       {/* <p>{message}</p> */}
//     </div>
//   )
// };
