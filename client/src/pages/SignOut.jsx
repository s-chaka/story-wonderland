import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../redux/user/userSlice';

const SignOut=()=> {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        const handleSignOut = async () => {
            try {
                await fetch('/api/auth/signout');
                dispatch(signOut());
                navigate('/sign-in');
            } catch (error) {
                console.error('Error signing out:', error.response?.data || error.message || error);
            }
        };
        handleSignOut();
    }, [dispatch, navigate]);
    return (
        <div>Signing you out...</div>
    )
};

export default SignOut;
