// import { useState } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { signInStart, signInSuccess,signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const SignIn= () => {
  const [formData, setFormData] = useState({});
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  //This useSelector hook is used to get the loading and error state from the store
  const {loading, error} = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  }
  // console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //This dispatches the signInStart action so that the loading state is set to true
      dispatch(signInStart());
      // setLoading(true);
      // setError(false);
      const res = await fetch('/api/auth/signin',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      //This dispatches the signInSuccess action so that the currentUser is set to the data returned from the server
      // setLoading(false);
      if (data.success === false) {
        dispatch(signInFailure(data));
        // setError(true);
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/profile')
    } catch (error) {
      dispatch(signInFailure(error));
      // setLoading(false);
      // setError(true);
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='text' placeholder='email' id='email' className='bg-slate-100 p-3 rounded-lg'
        onChange={handleChange} />
        <input type='password' placeholder='pasword' id='password' className='bg-slate-100 p-3 rounded-lg'
        onChange={handleChange} />
        <button disabled={loading} className='bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading ....' : 'Sign In'}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account? </p>  
        <Link to='/sign-up'>
          <span className='text-blue-500'>Sign Up</span>
        </Link>
      </div>
        <p className='text-red-700 mt-5'>{error ? error.message || 'Something went wrong!' : ''}</p>
      </div>
  )
};
export default SignIn;

