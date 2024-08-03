import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const llamaApiKey = process.env.LLAMA_API_KEY;
const llamaBaseUrl = 'https://api.llama-api.com/chat/completions';  // Updated URL
// console.log(`Llama API Key: ${llamaApiKey}`);
export const generateStorySegment = async (genre) => {
  try {
    const response = await axios.post(llamaBaseUrl, {
      model: "llama-13b-chat",  // Example model name, update if needed
      messages: [
        { role: "system", content: "Assistant is a large language model trained by OpenAI." },
        { role: "user", content: `Generate the first detailed segment of a ${genre} story with a maximum of 5 lines for children under 10 years old. Provide 2 choices for the next story segment path, and enumerate the choices.` }
      ],
      max_tokens: 500,
    }, {
      headers: {
        'Authorization': `Bearer ${llamaApiKey}`,
        'Content-Type': 'application/json',
      },
    });
    const segment = response.data.choices[0].message.content;
    // console.log("Api response Content:", segment);
    // return response.data.choices[0].message.content;  // Update this based on API response format
    return segment; 
  } catch (error) {
    console.error("Error generating story segment:", error);  
    throw new Error(error.response ? error.response.data : error.message);
  }
};

export const continueStorySegment = async (choice) => {
  try {
    const response = await axios.post(llamaBaseUrl, {
      model: "llama-13b-chat",  // Example model name, update if needed
      messages: [
        { role: "system", content: "Assistant is a large language model trained by OpenAI." },
        { role: "user", content: `Continue the story with the choice: ${choice} story with a maximum of 5 lines for children under 10 years old. Provide 2 choices for the next story segment path, and enumerate the choices.` }
      ],
      max_tokens: 500,
    }, {
      headers: {
        'Authorization': `Bearer ${llamaApiKey}`,
        'Content-Type': 'application/json',
      },
    });
    const segment = response.data.choices[0].message.content;
    console.log("API Response Content:", segment); // Log the content to verify
    return segment;
    // return response.data.choices[0].message.content;  // Update this based on API response format
  } catch (error) {
    console.error("Error continuing story segment:", error);  
    throw new Error(error.response ? error.response.data : error.message);
  }
};

export const generateFinalStorySegment = async (story) => {
  try {
      const response = await axios.post(llamaBaseUrl, {
          model: "llama-13b-chat",
          messages: [
              { role: "system", content: "Assistant is a large language model trained by OpenAI." },
              { role: "user", content: `End the following story with a satisfying conclusion: ${story} without giving choises` }
          ],
          max_tokens: 500,
      }, {
          headers: {
              'Authorization': `Bearer ${llamaApiKey}`,
              'Content-Type': 'application/json',
          },
      });

      const segment = response.data.choices[0].message.content;
      console.log("API Response Content:", segment);
      return segment;
  } catch (error) {
      console.error("Error generating final story segment:", error);
      throw new Error(error.response ? error.response.data : error.message);
  }
};