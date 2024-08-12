import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import SavedStories from '../components/SavedStories';
import renderWithProviders from '../RenderWithProvider';
import { Route, useNavigate} from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Stories from '../pages/Stories';

global.fetch = vi.fn();

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

  // it('renders saved stories correctly', async () => {
  //   mock.onGet('/api/auth/get-user-id').reply(200, { userId: '123' });
  //   mock.onGet('/api/saved-stories/123').reply(200, [
  //     {
  //       _id: '1',
  //       story: 'This is story 1.',
  //       createdAt: new Date().toISOString(),
  //     },
  //   ]);

  //   renderWithProviders(
  //     <Router>
  //       <SavedStories />
  //       {/* <Stories /> */}
  //     </Router>
  //     );
  //   // Wait for the async data fetching
  //   await waitFor(() => {
  // //     const storyElement = screen.getByText((content, element) => 
  // //       element.tagName.toLowerCase() === 'p' && content.includes('This is story 1.')
  // //     );
  // //     expect(storyElement).toBeInTheDocument();
  // // });
  //     // expect(screen.getByText((content, element) => content.includes('This is story 1.'))).toBeInTheDocument();
  //     expect(screen.getByText('This is story 1')).toBeInTheDocument();
  //   });
  // });

//   it('handles error state', async () => {
//     mock.onGet('/api/auth/get-user-id').reply(401);
//     mock.onGet('/api/saved-stories/123').reply(401);

//     renderWithProviders(<SavedStories />);

//     // Wait for the async data fetching
//     await waitFor(() => {
//       expect(screen.getByText('User not authenticated')).toBeInTheDocument();
//     });
//   });

//   it('handles story selection', async () => {
//     mock.onGet('/api/auth/get-user-id').reply(200, { userId: '123' });
//     mock.onGet('/api/saved-stories/123').reply(200, [
//       {
//         _id: '1',
//         title: 'Story 1',
//         story: 'This is story 1.',
//         createdAt: new Date().toISOString(),
//       },
//     ]);

//     renderWithProviders(<SavedStories />);

//     // Wait for the async data fetching
//     await waitFor(() => {
//       expect(screen.getByText('Story 1')).toBeInTheDocument();
//     });

//     // Simulate clicking on a story
//     fireEvent.click(screen.getByText('Story 1'));

//     // Check if the selected story details are shown
//     expect(screen.getByText('This is story 1.')).toBeInTheDocument();
//   });

//   it('navigates to sign-in on authentication error', async () => {
//     mock.onGet('/api/auth/get-user-id').reply(401);

//     const mockNavigate = vi.fn();
//     vi.mock('react-router-dom', () => ({
//       useNavigate: () => mockNavigate,
//     }));

//     renderWithProviders(<SavedStories />);

//     // Wait for the async data fetching
//     await waitFor(() => {
//       expect(mockNavigate).toHaveBeenCalledWith('/sign-in');
//     });
//   });
});
