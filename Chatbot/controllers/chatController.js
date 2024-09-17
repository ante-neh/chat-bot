// controllers/messageController.js
const { json } = require('body-parser');
const ConversationHistory = require('../models/conversationHistoryModel');
const searchEmbeddings = require('../services/generalEmbeddingService');
const { callGPT } = require('../services/openaiService');
const analyzeImageWithGPT4 = require('../services/visionService');

const initialText = `
    Please always note the important tagged section at the end of this prompt every time you generate the final response.
    You are a search assistant chatbot designed to help users effectively find products, services, or businesses on our platform. 
    You will engage in a dynamic conversation with users, guiding them with sample descriptions and adapting to changes in their requirements as the conversation progresses.

    Initial Guidance with Sample Descriptions:

    For Products: "Could you describe the product you're looking for? For instance, 'I'm interested in a high-performance gaming laptop with a budget of around 10,000 ETB.'"
    For Services: "What service do you need? Please describe it, such as, 'I need catering services for an outdoor event in Addis Ababa that can accommodate 100 guests.'"
    For Businesses: "Tell me about the type of business you are searching for, like 'I'm looking for a bookstore that offers a wide range of historical novels.'"
    Dynamic Interaction Process:

    Engage freely and adaptively, collecting information as the user provides it.
    Respond to changes in the user's requirements or corrections during the conversation, updating the collected information accordingly.
    Maintain flexibility to adjust the objectType and other details as the conversation evolves.
    Please make sure to collect necessary information before giving the user any final responses.
    Example Dynamic Interaction:

    User initially requests information on a service but changes to a product.
    Chatbot adapts: "Understood, you've switched to looking for a product. Could you specify the type of product you now need?"
    Field Order for Final String (to be adapted as needed):

    For Products: Title, Description, Price, Category, SubCategory, Provider, Condition, Address, City, Street, Specific Descriptions, Specifications, Negotiable status, Key Features, SubCategory (if product).
    For Services: Price, Service Name, Description, Specific Descriptions, Address, City, Street, Category, SubCategory, Open Time, Rating, Specifications, Facilities.
    For Businesses: Business Name, Business Category, Country, City, Street Address.
    Generating the JSON:
    Compile the dynamically collected and ordered information into a JSON object. For products, include 'subCategory':

    {
      "objectType": "[Product/Service/Business]",
      "searchString": "Concatenated and ordered search details"
    }
    If the objectType is 'Product', modify the JSON to include 'subCategory':
    {
      "objectType": "Product",
      "subCategory": "[Car/House]",
      "searchString": "Concatenated and ordered search details"
    }
    Final Response Format:

    After finalizing the collected data: "Here! zzz {"objectType": "[Updated Product/Service/Business]", "searchString": "[Updated, ordered details]", "subCategory": "[Car/House]" (if applicable)}"
    Completion Example:

    "Here! zzz {"objectType": "Product", "subCategory": "Car", "searchString": "Sedan, Mid-size, Price: 80000 ETB, Category: Vehicles, SubCategory: Cars, Provider: AutoBazar, Condition: Used, Address: 123 Car Lane, City: Addis Ababa, Street: Vehicle Ave, Specific Descriptions: Good condition, low mileage, Specifications: 2018 Model, Negotiable: Yes, Key Features: Cruise control, leather seats"}"

    Important: The final response must strictly follow the format provided. Do not add any text before the "Here!" part of the response. The final response should be strictly: "Here! zzz {JSON}". No additional text, explanations, or notes should be included.
  `
  ;

const getInitialHistory = () => [
  { 
    role: "system", 
    content: initialText 
  }
];

const handleMessage = async (req, res) => {
  const { cookieId, message } = req.body;

  try {
    let conversation = await ConversationHistory.findOne({ cookieId: cookieId });

    if (!conversation) {
      conversation = new ConversationHistory({ cookieId: cookieId, history: getInitialHistory() });
    }

    // Add the user's message to the conversation history
    conversation.history.push({
      role: "user",
      content: message,
    });

    // Call the GPT function with the updated conversation history
    let botResponse = await callGPT(conversation.history);

    // Add the bot's response to the conversation history
    conversation.history.push({
      role: "assistant",
      content: botResponse,
    });

    // Save updated history
    await conversation.save();

    // Extract the JSON part of the response using string manipulation
    let jsonResponse = null;
    const delimiter = 'zzz ';
    const jsonStartIndex = botResponse.indexOf(delimiter);

    if (jsonStartIndex !== -1) {
      let jsonString = botResponse.substring(jsonStartIndex + delimiter.length).trim(); // Skip the delimiter and trim any extra spaces
      // Handle and clean extra quotes around the JSON string
      jsonString = jsonString.replace(/^"+|"+$/g, '');

      try {
        jsonResponse = JSON.parse(jsonString);
      } catch (error) {
        console.error('Failed to parse JSON from the response:', error.message);
      }

      botResponse = botResponse.substring(0, jsonStartIndex).trim();
    }
    let result = await searchEmbeddings(jsonResponse);

    if (Object.keys(result).length === 0) {
      result = { products: [], services: [], businesses: [] };
    }

    res.json({ response: botResponse, ...result });

  } catch (error) {
    console.error('Error handling message:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const clearHistory = async (req, res) => {
  const { cookieId } = req.body;

  try {
    await ConversationHistory.findOneAndUpdate(
      { cookieId },
      { history: getInitialHistory() },
      { new: true }
    );

    res.json({ message: 'Conversation history cleared.' });
  } catch (error) {
    console.error('Error clearing history:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const imageSearch = async (req, res) => {
  const imageUrl = req.body.imageUrl;
  const searchString = await analyzeImageWithGPT4(imageUrl);

  if (searchString.includes("Error:")) {
    return res.status(400).json({ message: "The image provided is not of a car." });
  }

  const searchJson = {
    "objectType": "Product",
    "subCategory": "Car",
    "searchString": searchString
  }

  const result = await searchEmbeddings(searchJson);

  res.json(result);

}

module.exports = { handleMessage, clearHistory, imageSearch};