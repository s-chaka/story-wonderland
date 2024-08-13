import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import Profile from '../pages/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserStart, updateUserSuccess, deleteUserStart, deleteUserSuccess, deleteUserFailure } from '../redux/user/userSlice';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));


describe('Profile Component', () => {
  it('renders the profile form with current user data', () => {
    useSelector.mockReturnValue({
      currentUser: { username: 'TestUser', email: 'testuser@example.com', profilePic: 'http://example.com/photo.jpg' },
      loading: false,
      error: null,
    });

    render(<Profile />);

    expect(screen.getByText(/Hello, TestUser/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('User name').value).toBe('TestUser');
    expect(screen.getByPlaceholderText('email').value).toBe('testuser@example.com');
    expect(screen.getByRole('img')).toHaveAttribute('src', 'http://example.com/photo.jpg');
  });

  it('handles form submission and updates user data successfully', async () => {
    const dispatchMock = vi.fn();
    const navigateMock = vi.fn();
    const mockResponse = { success: true };

    useDispatch.mockReturnValue(dispatchMock);
    useNavigate.mockReturnValue(navigateMock);
    useSelector.mockReturnValue({
      currentUser: { _id: '123', username: 'TestUser', email: 'testuser@example.com', profilePic: 'http://example.com/photo.jpg' },
      loading: false,
      error: null,
    });

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    );

    render(<Profile />);

    const submitButton = screen.getByText(/Update/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith(updateUserStart());
      expect(global.fetch).toHaveBeenCalledWith('/api/user/update/123', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      expect(dispatchMock).toHaveBeenCalledWith(updateUserSuccess(mockResponse));
    });
  });

  it('handles delete account successfully', async () => {
    const dispatchMock = vi.fn();
    useDispatch.mockReturnValue(dispatchMock);
    useSelector.mockReturnValue({
      currentUser: { _id: '123', username: 'TestUser', email: 'testuser@example.com', profilePic: 'http://example.com/photo.jpg' },
      loading: false,
      error: null,
    });

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    );

    render(<Profile />);

    const deleteButton = screen.getByText(/Delete Account/i);
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith(deleteUserStart());
      expect(global.fetch).toHaveBeenCalledWith('/api/user/delete/123', { method: 'DELETE' });
      expect(dispatchMock).toHaveBeenCalledWith(deleteUserSuccess());
    });
  });

});
