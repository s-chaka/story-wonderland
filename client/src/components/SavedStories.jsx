import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';


const colors = [
    'text-red-500', 'text-blue-500', 'text-green-500', 'text-yellow-500', 
    'text-purple-500', 'text-pink-500', 'text-orange-500', 'text-teal-500'
];

const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
};

const SavedStories = () => {
    const [stories, setStories] = useState([]);
    const [error, setError] = useState(null);
    const [selectedStory, setSelectedStory] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchUserId = async () => {
        try {
            const response = await fetch('/api/auth/get-user-id');
            if (!response.ok) {
                if (response.status === 401) {
                    console.log('User not authenticated');
                    dispatch(signOut());
                    navigate('/sign-in');
                }
                throw new Error('Failed to fetch user ID');
            }
            const data = await response.json();
            return data.userId;
        } catch (error) {
            // console.error('Error fetching user ID:', error.message);
            setError(error.message);
            return null;
        }
    };

    const fetchSavedStories = async (userId) => {
        try {
            const response = await fetch(`/api/saved-stories/${userId}`);
            if (!response.ok) {
                if (response.status === 401) {
                    handleSignOut();
                }
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setStories(data);
        } catch (error) {
            // console.error('Error fetching saved stories:', error.message);
            setError(error.message);
        }
    };

    useEffect(() => {
        const loadStories = async () => {
            const userId = await fetchUserId();
            if (userId) {
                fetchSavedStories(userId);
            }
        };
        loadStories();
    }, []);

    const handleStoryClick = (story) => {
        setSelectedStory(story);
    };

    const getStoryTitle = (story) => {
        // Define the delimiters more comprehensively
        const delimiters = /(\.\s+|,\s+|:\s+|\*\*\*\s+|\*\s+\*)/;
        // Find the index of the first delimiter
        const index = story.story.search(delimiters);
        // Return the substring up to the delimiter or the full story if no delimiter is found
        return story.title || (index !== -1 ? story.story.substring(0, index) + '...' : story.story);
    };
    
    return (
        <div className='p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4'>
        <h1 className='text-2xl text-center font-semibold my-7'>Saved Stories</h1>
        {error && <p className='text-center text-red-500'>{error}</p>}
        {!selectedStory ? (
            <div>
                {stories.length === 0 ? (
                     <p className='text-center text-gray-500'>No saved stories found.</p>
                ) : (
                    <ul>
                        {stories.map((story) => (
                            <li key={story._id} className='mb-4 p-4 border border-gray-300 rounded-md'>
                                <button onClick={() => handleStoryClick(story)}  className={`block text-left font-bold bg-green-100 p-4 rounded-lg ${getRandomColor()}`}>
                                    <span>{getStoryTitle(story)} </span>
                                    <p className='text-sm text-gray-500'>Saved on {new Date(story.createdAt).toLocaleDateString()}</p> 
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        ) : (
            <div>
                <h3 className='font-bold'>{selectedStory.title || getStoryTitle(selectedStory)}</h3>
                <p>{selectedStory.story}</p>
                <button onClick={() => setSelectedStory(null)} className='w-full p-2 mt-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-300'>
                    Back to Stories
                </button>
            </div>
        )}
        </div>
        );
    };
export default SavedStories;