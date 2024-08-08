import { useSelector } from "react-redux"
import Story from "../components/Story";
import { useDispatch } from "react-redux";
import { Link , useNavigate} from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { 
  updateUserStart, 
  updateUserSuccess,
  updateUserFailure, 
  deleteUserStart, 
  deleteUserSuccess, 
  deleteUserFailure,
} from "../redux/user/userSlice";


const Profile= ()=> {
  const fileRef = useRef(null);
  const {currentUser, loading, error} = useSelector((state) => state.user);
  const [showProfileDetails, setShowProfileDetails] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleProfileDetails = () => {
    setShowProfileDetails(!showProfileDetails);
  };
  
  useEffect(() => {
    if(image){
      handleImageUpload(image);
    }
    
  }, [image]);

  const handleImageUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = 
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => 
          setFormData({ ...formData, profilePic: downloadURL })
      );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(updateUserFailure(data.message));
        navigate('/sign-in');
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess());
    } catch (error) {
      dispatch(deleteUserFailure(error));
      console.log(error);
    }
  }

  return (
    <div className="p-3 max-w-7xl mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'> Hello this is {currentUser.username}'s Dashboard</h1>
      <div className="flex">
        <div className="w-1/4 p-3">
          <button onClick={toggleProfileDetails} className="bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            {showProfileDetails ? 'Hide Profile Details' : 'Show Profile Details'}
          </button>
          {showProfileDetails &&(
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input onChange={(e)=>setImage(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*"
              />
              <img onClick={()=> fileRef.current.click()} src={ formData.profilePic || currentUser.profilePic} alt='profile' className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
              onChange={handleChange}/>
              <p className="text-small self-center">
                {imageUploadError ? (
                    <span className="text-red-700"> Image upload failed (image must be less than 2 mb!)</span>
                ): imagePercent > 0 && imagePercent < 100 ? (
                  <span className="text-slate-700"> {`Uploading ${imagePercent}%`}</span>
                ): imagePercent === 100 ? (
                  <span className="text-green-700">Image successfully uploaded! </span>
                ):(
                  ""
                )}
              </p>
              <input defaultValue={currentUser.username} type="text" id='username' placeholder="User name" className="bg-slate-100 rounded-lg p-3"
              onChange={handleChange}/>
              <input defaultValue={currentUser.email} type="text" id='email' placeholder="email" className="bg-slate-100 rounded-lg p-3"
              onChange={handleChange}/>
              <input type="password" id='password' placeholder="password" className="bg-slate-100 rounded-lg p-3"
              onChange={handleChange}/>
              <button disabled={loading} className="bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                {loading ? 'Loading...' : 'Update'}
              </button>
              <span onClick={handleDeleteAccount} className="text-red-700 cursor-pointer mb-4"> Delete Account</span>
              <p className="text-red-700 mt-7">{error ? error : ''}</p>
              <p className="text-green-700 mt-7">{updateSuccess ? 'User is updated successfuly' : ''}</p>
            </form>
            )}
        </div>
        <div className="w-2/4 p-3">
          <Story/>
        </div>
        <div className="mt-4 font-bold text-center">
          <Link to="/stories" className="text-green-500 hover:underline">
            Go to my Saved Stories
          </Link>
        </div>
      </div>
    </div>
  )
};
export default Profile;