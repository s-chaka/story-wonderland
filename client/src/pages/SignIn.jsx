import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { signInStart, signInSuccess,signInFailure,resetError } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const SignIn= () => {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(resetError());
  }, [dispatch])

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //This dispatches the signInStart action so that the loading state is set to true
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      //This dispatches the signInSuccess action so that the currentUser is set to the data returned from the server
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/dashboard');
    } catch (error) {
      dispatch(signInFailure(error));
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

