import { useNavigate } from 'react-router-dom';
import SavedStories from '../components/SavedStories';

const Stories= ()=> {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/dashboard');
    }
    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-200 via-blue-200 to-red-200 bg-opacity-60 backdrop-filter backdrop-blur-lg justify-center">
        <div className=" p-4">
            <div className="mb-6">
                <button onClick={handleBackClick} className="px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600">
                    Back to my dashboard
                </button>
                <SavedStories/>
            </div>
        </div>
        </div>
        );
    };
export default Stories;
