// src/ChatGPTService.js
import axios from 'axios';

// api key

const instance = axios.create({
    baseURL: 'https://api.openai.com/v1/', // Ensure this is correct
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
    },
});

export const getChatGPTResponse = async (message) => {
    try {
        const response = await instance.post('chat/completions', {
            model: 'gpt-4o', // Ensure this model is correct and available
            messages: [
                {
                    role: 'user',
                    content: message,
                },
            ],
            max_tokens: 150,
        });
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error fetching ChatGPT response:', error.response ? error.response.data : error.message);
        return 'Sorry, something went wrong.';
    }
};
