import { getAuth, GoogleAuthProvider , signInWithPopup} from 'firebase/auth';
import { app } from '../firebase';
// import { useDispatch } from 'react-redux';

export default function OAuth() {
  // const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const res = await fetch('/api/auth/google',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL

        })
      });
      const data = await res.json();
      // dispatch(signInSuccess(data));
    } catch (error) {
      console.log('unable to login with google',error);
    }
  };
  return (
    <button onClick={handleGoogleClick} type='button' className='bg-blue-950 text-white rounded-lg p-3 uppercase hover:opacity-95'>
      Continue with google</button>
  )
};