import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import SavedStories from '../components/SavedStories';
import renderWithProviders from '../RenderWithProvider';
import { BrowserRouter as Router } from 'react-router-dom';

describe('SavedStories Component', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios); // Create a new instance of MockAdapter before each test
  });

  afterEach(() => {
    mock.restore(); // Restore the original axios after each test
    vi.clearAllMocks(); // Clear mocks before each test
  });

  it('renders loading state initially', () => {
    mock.onGet('/api/auth/get-user-id').reply(200, { userId: '123' });
    mock.onGet('/api/saved-stories/123').reply(200, []);

    renderWithProviders(
        <Router>
            <SavedStories />
        </Router>
        );

    // Check if the loading state and messages are rendered correctly
    expect(screen.getByText('Saved Stories')).toBeInTheDocument();
    expect(screen.getByText('No saved stories found.')).toBeInTheDocument();
  });

});