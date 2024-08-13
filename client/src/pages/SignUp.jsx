import { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import OAuth from '../components/OAuth';

const SignUp=()=> {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/signup',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }
  return (
    <div className='min-h-screen bg-gradient-to-r from-purple-200 via-blue-200 to-red-200 bg-opacity-60 backdrop-filter backdrop-blur-lg justify-center'>
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 bg-white p-10 rounded-lg shadow-md w-100'>
        <input type='text' placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg'
        onChange={handleChange} />
        <input type='text' placeholder='email' id='email' className='bg-slate-100 p-3 rounded-lg'
        onChange={handleChange} />
        <input type='password' placeholder='pasword' id='password' className='bg-slate-100 p-3 rounded-lg'
        onChange={handleChange} />
        <button disabled={loading} className='bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading ....' : 'Sign Up'}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Already have an account? </p>  
        <Link to='/sign-in'>
          <span className='text-blue-500'>Sign in</span>
        </Link>
      </div>
        <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
      </div>
      </div>
  )
};
export default SignUp;
