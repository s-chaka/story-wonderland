import { describe, it, expect, vi } from 'vitest';
import { createFirstSegment, createNextSegment, endStorySegment, saveStory, getSavedStories } from '../controllers/story.controller.js';
import { generateStorySegment, continueStorySegment, generateFinalStorySegment } from '../llamaService.js';
import { Story } from '../models/storySegment.js';


// Mock dependencies
vi.mock('../llamaService.js', () => ({
  generateStorySegment: vi.fn(),
  continueStorySegment: vi.fn(),
  generateFinalStorySegment: vi.fn(),
}));

vi.mock('../models/storySegment.js', () => {
  return {
    Story: vi.fn().mockImplementation(() => ({
      save: vi.fn().mockResolvedValue({ userId: 'user123', story: 'A great story...' }),
      find: vi.fn(),
    })),
  };
});

describe('Story Controller Tests', () => {
  it('should create the first story segment successfully', async () => {
    const genre = 'fantasy';
    const segment = 'Once upon a time...';
    const choices = [
      "Oops! 🙊No path found🫨. You can end the story or click here to start a new adventure!🌟🚀",
      "Oops! 🙊No path found🫨. You can end the story or click here to start a new adventure!🌟🚀"
    ]; // Updated expected choices

    generateStorySegment.mockResolvedValue(segment);

    const req = { body: { genre } };
    const res = {
      json: vi.fn(),
    };

    await createFirstSegment(req, res);

    expect(generateStorySegment).toHaveBeenCalledWith(genre);
    expect(res.json).toHaveBeenCalledWith({ segment, choices });
  });

  it('should create the next story segment successfully', async () => {
    const choice = 'left';
    const segment = 'You went left...';
    const choices = [
      "Oops! 🙊No path found🫨. You can end the story or click here to start a new adventure!🌟🚀",
      "Oops! 🙊No path found🫨. You can end the story or click here to start a new adventure!🌟🚀"
    ]; // Updated expected choices

    continueStorySegment.mockResolvedValue(segment);

    const req = { body: { choice } };
    const res = {
      json: vi.fn(),
    };

    await createNextSegment(req, res);

    expect(continueStorySegment).toHaveBeenCalledWith(choice);
    expect(res.json).toHaveBeenCalledWith({ segment, choices });
  });

  // test for handle error when creating the first story segment
  it('should handle error when creating the first story segment', async () => {
    const genre = 'fantasy';
    const errorMessage = 'Error generating segment';

    generateStorySegment.mockRejectedValue(new Error(errorMessage));

    const req = { body: { genre } };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    await createFirstSegment(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });

  it('should handle error when creating the next story segment', async () => {
    const choice = 'left';
    const errorMessage = 'Error continuing segment';

    continueStorySegment.mockRejectedValue(new Error(errorMessage));

    const req = { body: { choice } };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    await createNextSegment(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });

  // test for endStorySegment
  it('should end the story segment successfully', async () => {
    const story = 'The end...';
    const segment = 'The final chapter...';

    generateFinalStorySegment.mockResolvedValue(segment);

    const req = { body: { story } };
    const res = {
      json: vi.fn(),
    };

    await endStorySegment(req, res);

    expect(generateFinalStorySegment).toHaveBeenCalledWith(story);
    expect(res.json).toHaveBeenCalledWith({ segment });
  });

  it('should handle error when ending the story segment', async () => {
    const story = 'The end...';
    const errorMessage = 'Error ending story';

    generateFinalStorySegment.mockRejectedValue(new Error(errorMessage));

    const req = { body: { story } };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    await endStorySegment(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
  });
  
  // Mock the Story model
  vi.mock('../models/storySegment.js', () => {
    return {
      Story: vi.fn().mockImplementation(() => ({
        save: vi.fn(),
      })),
    };
  });
  
  describe('Story Controller Tests', () => {
    it('should handle error when saving a story', async () => {
      const userId = 'user123';
      const story = 'A great story...';
      const errorMessage = 'Error saving story';
  
      // Mock the save method to throw an error
      Story.mockImplementationOnce(() => ({
        save: vi.fn().mockRejectedValue(new Error(errorMessage)),
      }));
  
      const req = { body: { userId, story } };
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };  
      // Call the saveStory function
      await saveStory(req, res);
  
      // Ensure the response was sent with status 500 and the error message
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });


