import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Story from '../components/Story';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { vi } from 'vitest';

const mock = new MockAdapter(axios);

describe('Story Component', () => {
    let consoleErrorSpy;

    beforeEach(() => {
        // Reset any previous mocks
        mock.reset();
        consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    test('should render the initial UI', () => {
        render(<Story />);
        expect(screen.getByText('Story Generator')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /generate story/i })).toBeInTheDocument(); // i flag for case-insensitive
    });

    test('should generate a story when "Generate Story" button is clicked', async () => {
        const genre = 'fantasy';

        // Mock the API call for generating a story
        mock.onPost('/api/generate-story').reply(200, {
            segment: 'Once upon a time...',
            choices: ['Go to the forest', 'Return to the village'],
        });

        render(<Story />);

        // Select genre
        fireEvent.change(screen.getByRole('combobox'), { target: { value: genre } }); // combobox is the select element

        // Click generate story button
        fireEvent.click(screen.getByRole('button', { name: /generate story/i }));

        // Wait for the story segment to appear
        await waitFor(() => expect(screen.getByText('Once upon a time...')).toBeInTheDocument());

        // Ensure that choices are displayed
        expect(screen.getByRole('button', { name: /go to the forest/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /return to the village/i })).toBeInTheDocument();
    });
    test('should handle API errors gracefully', async () => {
        const genre = 'sci-fi';

        // Mock the API call to return an error
        mock.onPost('/api/generate-story').reply(500, {
            message: 'Internal Server Error',
        });

        render(<Story />);

        // Select genre
        fireEvent.change(screen.getByRole('combobox'), { target: { value: genre } });

        // Click generate story button
        fireEvent.click(screen.getByRole('button', { name: /generate story/i }));

        // Since there's no UI element to show the error, we check the console error
        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith(
                'Error fetching user ID:',
                'Request failed with status code 404'
            );
        });
    });
    test('should continue the story when a choice is made', async () => {
        // Mock the initial API call for generating a story
        mock.onPost('/api/generate-story').reply(200, {
            segment: 'Once upon a time...',
            choices: ['Go to the forest', 'Return to the village'],
        });
    
        // Mock the API call for continuing the story
        mock.onPost('/api/continue-story').reply(200, {
            segment: 'You walk into the dark forest...',
            choices: ['Explore further', 'Go back'],
        });
    
        render(<Story />);
    
        // Generate the initial story
        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'fantasy' } });
        fireEvent.click(screen.getByRole('button', { name: /generate story/i }));
        await waitFor(() => screen.getByText('Once upon a time...'));
    
        // Click on a choice to continue the story
        fireEvent.click(screen.getByRole('button', { name: /go to the forest/i }));
    
        // Wait for the new story segment to appear
        await waitFor(() => expect(screen.getByText('You walk into the dark forest...')).toBeInTheDocument());
    
        // Ensure the new choices are displayed
        expect(screen.getByRole('button', { name: /explore further/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /go back/i })).toBeInTheDocument();
    });
});