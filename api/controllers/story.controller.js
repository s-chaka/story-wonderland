// import storySegment from "../models/storySegment";
import axios from "axios";
import { continueStorySegment, generateStorySegment } from "../llamaService.js";

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
    console.log("Request to generate story segment with genre:", genre);  // Log request
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
  

// app.post('/continue-story', 
export const createNextSegment= async (req, res) => {
    const { choice } = req.body;
    console.log("Request to continue story with choice:", choice);  // Log request
    try {
        const segment = await continueStorySegment(choice);
        const choices = extractChoices(segment);

        res.json({
            segment,
            choices
          });

    } catch (error) {
      console.error("Error in /continue-story endpoint:", error.message);  // Log error
      res.status(500).json({ error: error.message });
    }
  };