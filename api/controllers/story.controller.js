import { Story } from "../models/storySegment.js";
import { continueStorySegment, generateFinalStorySegment, generateStorySegment } from "../llamaService.js";

const extractChoices = (segment) => {
    // const choiceRegex = /(\d+)\.\s\*\*(.*?)\*\*:/g;
    const choiceRegex = /(?:\d+\.\s\*\*|\d+\.\s|\b[A-D]\)\s\*\*|\b[A-D]\)\s)(.*?)(?=\n|$)/g;
    let match;
    const choices = [];
    
    // while ((match = choiceRegex.exec(segment)) !== null) {
    //   choices.push(match[2]); // Extracting the choice text
    // }
    while ((match = choiceRegex.exec(segment)) !== null) {
        choices.push(match[1].trim()); // Extracting the choice text
      }
  
    // Ensure we have exactly two choices
    // return choices.length === 2 ? choices : ["Choice 1 not found", "Choice 2 not found"];
    while (choices.length < 2) {
        choices.push(`Choice ${choices.length + 1} not found`);
      }
      
      return choices.slice(0, 2);
};

export const createFirstSegment= async (req, res) => {
    const { genre } = req.body;
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
  
export const createNextSegment= async (req, res) => {
    const { choice } = req.body;
    try {
        const segment = await continueStorySegment(choice);
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

  export const endStorySegment = async (req, res) => {
    const { story } = req.body;
    try {
        const segment = await generateFinalStorySegment(story);

        res.json({
            segment
        });
    } catch (error) {
        console.error("Error in /end-story endpoint:", error.message);  
        res.status(500).json({ error: error.message });
    }
  };

// save story segment to the database
  export const saveStory = async (req, res) => {
    const { userId, story } = req.body;

    if (!userId || !story) {
      return res.status(400).json({ error: "All fields are required" });
    }
    try {
      const newStory = new Story({ userId, story });
        await newStory.save();
        res.status(201).json({ message: "Story saved successfully!" });
    } catch (error) {
      console.error("Error saving story:", error.message);
      res.status(500).json({ error: error.message });
    }
  };

  export const getSavedStories = async (req, res) => {
    const { userId } = req.params;
    try {
      const stories = await Story.find({ userId }).sort({ createdAt: -1 });
      res.json(stories);
    } catch (error) {
      console.error("Error fetching saved stories:", error.message); 
      res.status(500).json({ error: error.message });
    }
  };
