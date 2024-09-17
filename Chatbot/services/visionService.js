require('dotenv').config();

const OpenAIApi = require("openai");
const imageToBase64 = require('../utils/imageToBase64');

const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAIApi({
  apiKey: apiKey,
});

async function analyzeImageWithGPT4(imageUrl) {
    try {
        const base64Image = await imageToBase64(imageUrl);
        const response = await openai.chat.completions.create
        ({
            model: "gpt-4o-mini", // Ensure you use the correct model with vision capabilities
            messages: [
                {
                    role: "user",
                    content: [{
                        "type": "text",
                        "text": `You are a highly specialized AI trained to analyze images of cars and generate detailed descriptions in a specific format. When provided an image of a car, you are tasked with creating a description that includes the car type, make, model, color, price (in US dollars, converted to birr), negotiability, condition, mileage, specific features, and location. Assume any necessary details if they are not visible in the image, based on typical attributes of similar cars. If the image is not of a car, return an error message.

                        Specifically, the description should follow this format:
                        
                        "Car, [Make] [Year] model [Model Type], [Color], Price: Around [Calculated Price in Birr] birr, Negotiable: Yes, Condition: [Condition], Mileage: Around [Mileage]km, Specific Descriptions: [Specific Features], Address: Addis Ababa"
                        
                        Here's how you should handle the price:
                        1. When you retrieve a price from the database, it will be in US dollars.
                        2. Convert the dollar price to birr at a rate of 1 USD to 120 birr.
                        3. Apply a tax rate of 500%, meaning multiply the converted price in birr by 5.
                        4. Include the final calculated price in the description. 
                        
                        For example, if the price in the database is $1,000:
                        - Convert $1,000 to 120,000 birr (1,000 x 120).
                        - Apply the tax rate to get 600,000 birr (120,000 x 5).
                        - The description should then read: "Car, [Make] 2024 model [Model Type], [Color], Price: Around 600,000 birr, Negotiable: Yes, Condition: [Condition], Mileage: Around [Mileage]km, Specific Descriptions: [Specific Features], Address: Addis Ababa."
                        
                        Please ensure that the location is always Addis Ababa and include all calculations explicitly in your response.
                        Please note that you don't have to explain the whole calcuation in the result text, just generate only the text containing the information about the car in the image.
                        `                        
                    }, {
                        "type": "image_url",
                        "image_url": {
                            "url": `data:image/jpeg;base64,${base64Image}`
                        }
                    }]
                }
            ],
            max_tokens: 300,
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error('Failed to analyze image with GPT-4:', error.message);
        throw error;
    }
}

module.exports = analyzeImageWithGPT4;
