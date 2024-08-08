import { NavLink} from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const {currentUser} = useSelector((state) => state.user);

  return (
    <div className='bg-green-200'>
    <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
      <NavLink to='/'>
        <h1 className='font-bold'>Story-Wonderland</h1>
      </NavLink>
      <ul className='flex gap-4'>
        <NavLink
          to='/'
          className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-black')}
        >
          <li>Home</li>
        </NavLink>
        <NavLink
          to='/about'
          className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-black')}
        >
          <li>About</li>
        </NavLink>
        {currentUser ? (
          <>
            <NavLink
              to='/dashboard'
              className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-black')}
            >
              <li>Dashboard</li>
            </NavLink>
            <NavLink
              to='/sign-out'
              className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-black')}
            >
              <li className='cursor-pointer'>Sign Out</li>
            </NavLink>
            <NavLink
              to='/profile'
              className={({ isActive }) => (isActive ? 'border-2 border-blue-500 rounded-full' : '')}
            >
              <img
                src={currentUser.profilePic}
                alt='profile'
                className='h-7 w-7 rounded-full object-cover'
              />
            </NavLink>
          </>
        ) : (
          <NavLink
            to='/sign-in'
            className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-black')}
          >
            <li>Sign In</li>
          </NavLink>
        )}
      </ul>
    </div>
  </div>
);
};
