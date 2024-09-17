// middlewares/textModificationMiddleware.js
const OpenAIApi  = require("openai");
const dotenv = require('dotenv');
const path = require('path');

// Configure dotenv to load the .env file from the correct path
dotenv.config({ path: path.join(__dirname, '../../.env') });

const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAIApi({
    apiKey: apiKey,
});

const modifyTextWithOpenAI = async (req, res, next) => {
    const { searchString } = req.body;

    if (!searchString) {
        return res.status(400).json({ error: "Search string is required." });
    }

    try {
        // Create the conversation history with the required prompt
        const conversationHistory = [
            {
                role: 'system',
                content: `
                You are a chatbot tasked with reorganizing details about products, services, or businesses into a specific sequence. Your role is to take the provided information for each type of object and reorder it into the correct format. Please ensure you do not add any new characters and only include the fields present in the user's input. You are not supposed to have a conversation; your sole task is to modify and reorder the text as specified.

                Field Sequences for Each Object:
                
                For Products: Title, Description, Price, Category, SubCategory, Provider, Condition, Address, City, Street, Specific Descriptions, Specifications, Negotiable or not, Key Features.
                For Services: Price, Service Name, Description, Specific Descriptions, Address, City, Street, Category, SubCategory, Open Time, Rating, Specifications, Facilities.
                For Businesses: Business Name, Business Category, Country, City, Street Address.
                Instructions for Use:
                
                Receive Input: Accept details based on the object type—product, service, or business.
                Extract and Identify: Locate information for each relevant field.
                Reformat and Concatenate: Rearrange the information to match the sequence provided for the respective object type.
                Output: Deliver the reordered details as a single line of text, ensuring each field flows into the next without additional formatting or characters.
                Example Usage:
                
                Input for a Product: "Price: $500, Title: Vintage Lamp, Description: A classic lamp from the 1920s, Category: Antiques."
                Reformatted Output for a Product: "Vintage Lamp, A classic lamp from the 1920s, $500, Antiques. please just skip the not provided ones`
            },
            {
                role: 'user',
                content: searchString
            }
        ];

        const response = await openai.chat.completions.create({
            model: "gpt-4", // Switch to different models if necessary
            messages: conversationHistory,
          });
        
        // Call GPT to get the reformatted text
        const reformattedText = response.choices[0].message.content;
        
        // Update the request body with the reformatted text
        req.body.searchString = reformattedText;
        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error in modifyTextWithOpenAI:', error);
        res.status(500).json({ error: error.message || "An unexpected error occurred." });
    }
};

module.exports = modifyTextWithOpenAI;
