import { Story } from "../models/storySegment.js";
import { continueStorySegment, generateFinalStorySegment, generateStorySegment } from "../llamaService.js";


// Helper function to Extract choices from a story segment
const extractChoices = (segment) => {
    const choiceRegex = /(?:\d+\.\s\*\*|\d+\.\s|\b[A-D]\)\s\*\*|\b[A-D]\)\s)(.*?)(?=\n|$)/g;
    let match;
    const choices = [];
  
    while ((match = choiceRegex.exec(segment)) !== null) {
        choices.push(match[1].trim()); // Extracting the choice text
      }

    while (choices.length < 2) {
        choices.push(`Oops! 🙊No path found🫨. Start a new adventure!🌟🚀`);
      } 
    console.log("Choices:", choices);  // Log choices     
      return choices.slice(0, 2);
};

// generate the first story segment
  export const createFirstSegment= async (req, res) => {
    const { genre } = req.body;
    console.log("Request to generate story segment with genre:", genre);  
    try {
      const segment = await generateStorySegment(genre);
      const choices = extractChoices(segment);
    res.json({
        segment,
        choices
      });
    } catch (error) {
      console.error("Error in /generate-story endpoint:", error.response ? error.response.data : error.message);  // Log error
      res.status(500).json({ error: error.response ? error.response.data : error.message });
    }
  };

  // continue the story
  export const createNextSegment= async (req, res) => {
    const { choice } = req.body;
    try {
        const segment = await continueStorySegment(choice);
        console.log("Segment:", segment);  
        const choices = extractChoices(segment);

        res.json({
            segment,
            choices
          });

    } catch (error) {
      console.error("Error in /continue-story endpoint:", error.message);  
      res.status(500).json({ error: error.message });
    }
  };

  // end the story
  export const endStorySegment = async (req, res) => {
    const { story } = req.body;
    console.log("Request to end story:", story);  // Log request
    try {
        const segment = await generateFinalStorySegment(story);

        res.json({
            segment
        });
    } catch (error) {
        console.error("Error in /end-story endpoint:", error.message);  // Log error
        res.status(500).json({ error: error.message });
    }
  };

  // Helper Function to clean story segments
  const cleanStorySegment = (segment) => {
  console.log("Original Segment:", segment);  // Log original segment
  const cleaned = segment
      .replace(/(?:\d+\.\s\*\*|\d+\.\s|\b[A-D]\)\s\*\*|\b[A-D]\)\s)(.*?)(?=\n|$)/g, '')
      .replace(/Do you want to:.*$/gm, '')
      .replace(/[^\w\s.,'"\n-]/g, '')
      .replace(/\d+\.\s+.*?$/gm, '')
      .replace(/\n{2,}/g, '\n\n')
      .trim();
  console.log("Cleaned Segment:", cleaned);  // Log cleaned segment
  return cleaned;
};

// save story segment to the database
  export const saveStory = async (req, res) => {
    const { userId, story } = req.body;

    if (!userId || !story) {
      return res.status(400).json({ error: "All fields are required" });
    }
    try {
      const cleanedStory = cleanStorySegment(story);
      const newStory = new Story({ userId, story: cleanedStory });
        await newStory.save();
        res.status(201).json({ message: "Story saved successfully!" });
        console.log("FULL SAVED-STORY#####:", newStory)
    } catch (error) {
      console.error("Error saving story:", error.message);
      res.status(500).json({ error: error.message });
    }
  };

  // get saved stories from the database
  export const getSavedStories = async (req, res) => {
    const { userId } = req.params;
    // console.log("Request to get saved stories for user:", userId);  // Log request
    try {
      const stories = await Story.find({ userId }).sort({ createdAt: -1 });
      res.json(stories);
      // console.log("Stories:", stories);  // Log response
    } catch (error) {
      console.error("Error fetching saved stories:", error.message);  // Log error
      res.status(500).json({ error: error.message });
    }
  };


