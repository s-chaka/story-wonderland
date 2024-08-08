// import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ref, listAll, getDownloadURL } from "firebase/storage";
import {storage} from '../firebase.js';  


const Story = () =>  {
    const [genre, setGenre] = useState('');
    const [currentSegment, setCurrentSegment] = useState('');
    const [choices, setChoices] = useState([]);
    const [isStoryEnded, setIsStoryEnded] = useState(false);
    const [userId, setUserId] = useState('null');
    const [segmentHistory, setSegmentHistory] = useState([]);
    const [choicesHistory, setChoicesHistory] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [showFullStory, setShowFullStory] = useState(false);
    const [backgroundImageUrl, setBackgroundImageUrl] = useState('');

    // Function to handle genre change
    const handleGenreChange = (e) => setGenre(e.target.value);

    // Function to fetch a random background image URL
    const fetchBackgroundImageUrl = async (genre) => {
        try {
            const listRef = ref(storage, `images/${genre}/`);
            const listResponse = await listAll(listRef);

            if (listResponse.items.length === 0) {
                throw new Error('No images found for this genre');
            }

            // Get a random image from the list
            const randomImageRef = listResponse.items[Math.floor(Math.random() * listResponse.items.length)];
            const url = await getDownloadURL(randomImageRef);

            setBackgroundImageUrl(url);
        } catch (error) {
            console.error('Error fetching background image URL:', error);
        }
    };
    // Fetch a random background image URL when genre changes
    useEffect(() => {
        if (genre) {
            fetchBackgroundImageUrl(genre);
        }
    }, [genre]); // Run this effect when genre changes

    // Log the background image URL when it changes
    useEffect(() => {
        console.log("Background Image URL:", backgroundImageUrl); // Log the URL when it changes
    }, [backgroundImageUrl]);
    
    // Function to generate a new story
    const generateStory = async () => {
        try {
            const response = await axios.post('/api/generate-story', { genre });
            const {segment, choices} = response.data;
            
            setSegmentHistory([segment]);
            setChoicesHistory([choices]);
            setCurrentSegment(segment);
            setChoices(choices);
            setCurrentIndex(0);
            setIsStoryEnded(false);
            fetchBackgroundImageUrl(genre);

        } catch (error) {
            console.error("Error generating story:", error.response?.data || error.message || error);  // Log detailed error
        }
    };
    
    // Function to continue the story
    const continueStory = async (choice) => {
        try {
            const response = await axios.post('/api/continue-story', { choice });
            const { segment, choices } = response.data;
            
            console.log('Continued Segment:', segment); 
            const newSegmentHistory = [...segmentHistory, segment];
            const newChoicesHistory = [...choicesHistory, choices];
            setSegmentHistory(newSegmentHistory);
            setChoicesHistory(newChoicesHistory);
            setCurrentSegment(segment);
            setChoices(choices);
            setCurrentIndex(newSegmentHistory.length - 1);
            fetchBackgroundImageUrl(genre); // Fetch a background image

        } catch (error) {
            console.error('Error continuing story:', error.response?.data || error.message || error);
        }
    };

    // Function to end the story
    const endStory = async () => {
        try {
            const response = await axios.post('/api/end-story', { story: currentSegment });
            const { segment } = response.data;

            console.log('End Segment:', segment); 
            const newSegmentHistory = [...segmentHistory, segment];
            setSegmentHistory(newSegmentHistory);
            setChoicesHistory([...choicesHistory,[]]);
            setCurrentSegment(segment);
            setChoices([]);  // No more choices, story has ended
            setIsStoryEnded(true);
            setCurrentIndex(newSegmentHistory.length - 1);
            fetchBackgroundImageUrl(genre);
        } catch (error) {
            console.error('Error ending story:', error.response?.data || error.message || error);
        }
    };
    
    const fetchUserId = async () => {
        try {
            const response = await axios.get('/api/auth/get-user-id',{
                // headers: { 'Authorization': `Bearer ${access_token}` }, // Replace `yourToken` with the actual token
                withCredentials: true});
            setUserId(response.data.userId);
        } catch (error) {
            console.error('Error fetching user ID:', error.response?.data || error.message || error);
        }
    };

    useEffect(() => {
        fetchUserId(); // Fetch user ID when component mounts
    }, []);

    const saveStory = async () => {
        if (!userId) {
            console.error('User ID is not available.');
            return;
        }
        
        try {
            const response = await axios.post('/api/save-story', { userId, story: segmentHistory.join('\n\n') });
            console.log('Story saved:', response.data);
            setShowFullStory(true);
        } catch (error) {
            console.error('Error saving story:', error.response?.data || error.message || error);
        }
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setCurrentSegment(segmentHistory[currentIndex - 1]);
            setChoices(choicesHistory[currentIndex - 1]);// Retrieve previous segment and choices
            setIsStoryEnded(false);
        }
    }

    return (
    <div className="relative">
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center -z-10"
        style={{ 
            backgroundImage: `url(${backgroundImageUrl})`,
            // backgroundAttachment: 'fixed'
        }}
      />

      <div className='p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4 relative z-10'>
        {!showFullStory && (
          <>
            <h1 className='text-2xl text-center font-semibold my-7'>Story Generator</h1>
            <select 
              value={genre} 
              onChange={handleGenreChange} 
              className='block w-full p-2 border border-gray-300 rounded-md'
            >
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
          </>
        )}

        {!showFullStory && currentSegment && (
          <p className='mt-4 text-gray-700'>{currentSegment}</p>
        )}
        {!showFullStory && choices.length > 0 && (
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
        )}
        {!showFullStory && !isStoryEnded && currentIndex > 0 && (
          <button 
            onClick={handleBack} 
            className='w-full p-2 mt-4 bg-blue-700 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300'
          >
            Back
          </button>
        )}
        {!showFullStory && !isStoryEnded && currentSegment && (
          <button 
            onClick={endStory} 
            className='w-full p-2 mt-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300'
          >
            End Story
          </button>
        )}
        {!showFullStory && isStoryEnded && (
          <button 
            onClick={saveStory} 
            className='w-full p-2 mt-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-300'
          >
            Save Story
          </button>
        )}
        {showFullStory && (
          <div className='mt-4 p-2 bg-gray-100 rounded-md'>
            <h2 className='text-xl font-semibold text-center'>Full story</h2>
            <p className='text-green-700 mt-4'>{segmentHistory.join('\n\n')}</p>
          </div>
        )}
      </div> 
    </div> 
  );
}

export default Story;