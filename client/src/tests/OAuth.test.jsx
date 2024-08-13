import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import OAuth from '../components/OAuth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { signInSuccess } from '../redux/user/userSlice'; 

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(),
  GoogleAuthProvider: vi.fn(),
  signInWithPopup: vi.fn(),
}));

describe('OAuth Component', () => {
  it('handles Google sign-in and dispatches signInSuccess on success', async () => {
    const dispatchMock = vi.fn();
    const navigateMock = vi.fn();
    const mockUser = {
      displayName: 'Test User',
      email: 'testuser@example.com',
      photoURL: 'http://example.com/photo.jpg',
    };
    const mockResponse = { success: true };

    useDispatch.mockReturnValue(dispatchMock);
    useNavigate.mockReturnValue(navigateMock);

    getAuth.mockReturnValue({});
    GoogleAuthProvider.mockReturnValue({});
    signInWithPopup.mockResolvedValue({ user: mockUser });

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    );

    render(<OAuth />);

    const button = screen.getByText(/continue with google/i);
    fireEvent.click(button);

    await waitFor(() => {
      expect(signInWithPopup).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: mockUser.displayName,
          email: mockUser.email,
          photo: mockUser.photoURL,
        }),
      });
      expect(dispatchMock).toHaveBeenCalledWith(signInSuccess(mockResponse));
      expect(navigateMock).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('handles errors during Google sign-in', async () => {
    const dispatchMock = vi.fn();
    const navigateMock = vi.fn();
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    useDispatch.mockReturnValue(dispatchMock);
    useNavigate.mockReturnValue(navigateMock);

    signInWithPopup.mockRejectedValue(new Error('Google sign-in error'));

    render(<OAuth />);

    const button = screen.getByText(/continue with google/i);
    fireEvent.click(button);

    await waitFor(() => {
      expect(signInWithPopup).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith('unable to login with google', expect.any(Error));
      expect(dispatchMock).not.toHaveBeenCalled();
      expect(navigateMock).not.toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });
});
