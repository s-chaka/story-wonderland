import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const llamaApiKey = process.env.LLAMA_API_KEY;
const llamaBaseUrl = 'https://api.llama-api.com/chat/completions'; 

export const generateStorySegment = async (genre) => {
  try {
    const response = await axios.post(llamaBaseUrl, {
      model: "llama-13b-chat",  
      messages: [
        { role: "system", content: "As story generator and narrator only include the story title in the beggining with out any other nonrelated phrases." },
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
    return segment; 
  } catch (error) {
    console.error("Error generating story segment:", error);  
    throw new Error(error.response ? error.response.data : error.message);
  }
};

export const continueStorySegment = async (choice) => {
  try {
    const response = await axios.post(llamaBaseUrl, {
      model: "llama-13b-chat",  
      messages: [
        // { role: "system", content: "You are a story generator and Generate the next part of the story, starting immediately after the last line, without adding any additional introductory or system-generated text like 'Let's continue the story!' or similar." },
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
    return segment;
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
              { role: "user", content: `End the following story with a satisfying conclusion: ${story} without giving choises with a maximum of 5 lines` }
          ],
          max_tokens: 500,
      }, {
          headers: {
              'Authorization': `Bearer ${llamaApiKey}`,
              'Content-Type': 'application/json',
          },
      });

      const segment = response.data.choices[0].message.content;
      return segment;
  } catch (error) {
      console.error("Error generating final story segment:", error);
      throw new Error(error.response ? error.response.data : error.message);
  }
};
