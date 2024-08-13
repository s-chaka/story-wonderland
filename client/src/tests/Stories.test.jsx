import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Stories from '../pages/Stories';
import renderWithProviders from '../RenderWithProvider.jsx'

// Create a mock function for useNavigate
const mockNavigate = vi.fn();

// Mock useNavigate from react-router-dom
vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useNavigate: () => mockNavigate
    };
  });
  
  describe('Stories Component', () => {
    it('renders the Stories component', () => {
      renderWithProviders(
        <MemoryRouter>
          <Stories />
        </MemoryRouter>
      );
  
      // Check if the "Back to my dashboard" button is rendered
      expect(screen.getByText('Back to my dashboard')).toBeInTheDocument();
      // expect(screen.getByTestId('Saved Stories')).toBeInTheDocument();
    });
  
    it('navigates to /dashboard when the back button is clicked', () => {
      renderWithProviders(
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<Stories />} />
            <Route path="/dashboard" element={<div>Dashboard</div>} />
          </Routes>
        </MemoryRouter>
      );
  
      // Simulate a button click
      fireEvent.click(screen.getByText('Back to my dashboard'));
  
      // Check if the navigate function was called with the correct path
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });