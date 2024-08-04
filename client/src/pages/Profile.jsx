import { useSelector } from "react-redux"
import Story from "../components/Story";
import { useDispatch } from "react-redux";
import { signOut } from "../redux/user/userSlice";
import { useRef, useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';


const Profile= ()=> {
  const fileRef = useRef(null);
  const {currentUser} = useSelector((state) => state.user);
  const [showProfileDetails, setShowProfileDetails] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [formData, setFormData] = useState({})
  
  const toggleProfileDetails = () => {
    setShowProfileDetails(!showProfileDetails);
  };
  
  const dispatch = useDispatch();
  
  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut())
    } catch (error) {
      console.log(error);
    }
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

  return (
    <div className="p-3 max-w-7xl mx-auto">
      <div className="absolute top-10 right-10 p-3"> 
        <span onClick={handleSignOut} className="text-blue-700 cursor-pointer"> Sign Out</span> 
      </div>
      <h1 className='text-3xl font-semibold text-center my-7'> Hello {currentUser.username}</h1>
      <div className="flex">
        <div className="w-1/4 p-3">
          <button onClick={toggleProfileDetails} className="bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            {showProfileDetails ? 'Hide Profile Details' : 'Show Profile Details'}
          </button>
          {showProfileDetails &&(
            <form className="flex flex-col gap-4">
              <input onChange={(e)=>setImage(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*"/>
              <img onClick={()=> fileRef.current.click()} src={ formData.profilePic || currentUser.profilePic} alt='profile' className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"/>
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
              <input defaultValue={currentUser.username} type="text" id='username' placeholder="User name" className="bg-slate-100 rounded-lg p-3"/>
              <input defaultValue={currentUser.email} type="text" id='email' placeholder="email" className="bg-slate-100 rounded-lg p-3"/>
              <input type="password" id='password' placeholder="password" className="bg-slate-100 rounded-lg p-3"/>
              <button className="bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                update
              </button>
              <span className="text-red-700 cursor-pointer mb-4"> Delete Account</span>
            </form>
            )}
        </div>
        <div className="w-2/4 p-3">
          <Story/>
        </div>
      </div>
    </div>
  )
};
export default Profile;