import { useSelector } from "react-redux"
import { useState } from "react";
import Story from "../components/Story";
import { useDispatch } from "react-redux";
import { signOut } from "../redux/user/userSlice";

const Profile= ()=> {
  const {currentUser} = useSelector((state) => state.user);
  console.log(currentUser);
  const [showProfileDetails, setShowProfileDetails] = useState(false);

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
  return (
    <div className="p-3 max-w-7xl mx-auto">
      {/* <div className="fw-1/4 p-3 flex flex-col justify-center items-center">  */}
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
        // <div className="p-3 max-w-lg mx-auto">
        //   <h1 className='text-3xl font-semibold text-center my-7'> Profile</h1>
            <form className="flex flex-col gap-4">
              <img src={currentUser.profilePic} alt='profile' className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"/>
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
        {/* <div className="flex justify-between mt-5">  */}
          {/* <span className="text-red-700 cursor-pointer"> Delete Account</span>÷ */}
          {/* <span onClick={handleSignOut} className="text-red-700 cursor-pointer"> Sign Out</span>  */}
        {/* </div> */}
        <div className="w-2/4 p-3">
          <Story/>
        </div>
      </div>
    </div>
  )
};
export default Profile;