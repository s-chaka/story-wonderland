import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import SignOut from '../pages/SignOut';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../redux/user/userSlice';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('SignOut Component', () => {
  it('dispatches signOut action and navigates to /sign-in on component mount', async () => {
    const dispatchMock = vi.fn();
    const navigateMock = vi.fn();

    // Mocking useDispatch and useNavigate hooks
    useDispatch.mockReturnValue(dispatchMock);
    useNavigate.mockReturnValue(navigateMock);

    // Mock fetch
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );

    render(<SignOut />);

    // Expect fetch to be called
    await vi.waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/auth/signout');
        // Expect dispatch to be called with signOut action
        expect(dispatchMock).toHaveBeenCalledWith(signOut());
        // Expect navigate to be called with '/sign-in'
        expect(navigateMock).toHaveBeenCalledWith('/sign-in');
    });
    // Cleanup
        vi.restoreAllMocks();
    });

  it('displays an error message when fetch fails', async () => {
    const dispatchMock = vi.fn();
    const navigateMock = vi.fn();

    // Mocking useDispatch and useNavigate hooks
    useDispatch.mockReturnValue(dispatchMock);
    useNavigate.mockReturnValue(navigateMock);

    // Mock fetch to reject
    global.fetch = vi.fn(() =>
      Promise.reject(new Error('Failed to sign out'))
    );

    render(<SignOut />);

    // Expect fetch to be called
    expect(fetch).toHaveBeenCalledWith('/api/auth/signout');
    // Expect dispatch to not be called
    expect(dispatchMock).not.toHaveBeenCalled();
    // Expect navigate to not be called
    expect(navigateMock).not.toHaveBeenCalled();

    // Cleanup
    vi.restoreAllMocks();
  });

  it('renders the "Signing you out..." text', () => {
    render(<SignOut />);
    expect(screen.getByText('Signing you out...')).toBeInTheDocument();
  });
});
