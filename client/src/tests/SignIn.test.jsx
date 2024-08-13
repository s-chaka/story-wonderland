import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import SignIn from '../pages/SignIn';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure, resetError } from '../redux/user/userSlice';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  Link: ({ to, children }) => <a href={to}>{children}</a>, // Mock Link to avoid errors in the test environment
}));

describe('SignIn Component', () => {
  it('renders SignIn form correctly', () => {
    const dispatchMock = vi.fn();
    useDispatch.mockReturnValue(dispatchMock);
    useSelector.mockReturnValue({ loading: false, error: null });
    
    render(<SignIn />);

    expect(screen.getByPlaceholderText('email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('pasword')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByText(/dont have an account\?/i)).toBeInTheDocument();
  });

  it('handles input changes correctly', () => {
    useSelector.mockReturnValue({ loading: false, error: null });
    render(<SignIn />);

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('pasword');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('dispatches signIn actions and navigates on successful sign-in', async () => {
    const dispatchMock = vi.fn();
    const navigateMock = vi.fn();

    useDispatch.mockReturnValue(dispatchMock);
    useSelector.mockReturnValue({ loading: false, error: null });
    useNavigate.mockReturnValue(navigateMock);

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    );

    render(<SignIn />);

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('pasword');
    const signInButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith(signInStart());
      expect(dispatchMock).toHaveBeenCalledWith(signInSuccess({ success: true }));
      expect(navigateMock).toHaveBeenCalledWith('/profile');
    });
  });

  it('displays error message on failed sign-in', async () => {
    const dispatchMock = vi.fn();
    const errorMessage = 'Invalid credentials';

    useDispatch.mockReturnValue(dispatchMock);
    useSelector.mockReturnValue({ loading: false, error: { message: errorMessage } });

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: false, message: errorMessage }),
      })
    );

    render(<SignIn />);

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('pasword');
    const signInButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith(signInStart());
      expect(dispatchMock).toHaveBeenCalledWith(signInFailure({ success: false, message: errorMessage }));
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('disables the sign-in button when loading', () => {
    useSelector.mockReturnValue({ loading: true, error: null });

    render(<SignIn />);

    const signInButton = screen.getByRole('button', { name: /loading/i });
    expect(signInButton).toBeDisabled();
  });
});
