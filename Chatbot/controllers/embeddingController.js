const { searchProductEmbeddings } = require('../services/productEmbeddingService');
const { searchBusinessEmbeddings } = require('../services/businessEmbeddingService');
const { searchServiceEmbeddings } = require('../services/serviceEmbeddingService');

const generalSearch = async (req, res) => {
    try {
        const { searchString } = req.body; // Extract search string from the request body
        const { page = 1, limit = 10 } = req.query; // Set default pagination parameters

        // Convert page and limit to integers to ensure they are in the correct format
        const pageNo = parseInt(page, 10);
        const limitNo = parseInt(limit, 10);

        // Ensure the search string is provided
        if (!searchString) {
            return res.status(400).json({ error: "Search string is required." });
        }

        // Validate pagination parameters
        if (isNaN(pageNo) || isNaN(limitNo) || pageNo < 1 || limitNo < 1) {
            return res.status(400).json({ error: "Invalid pagination parameters." });
        }

        // Call search functions directly for products, businesses, and services
        const productResults = await searchProductEmbeddings(searchString, pageNo, limitNo);
        // const businessResults = await searchBusinessEmbeddings(searchString, pageNo, limitNo);
        // const serviceResults = await searchServiceEmbeddings(searchString, pageNo, limitNo);

        // Construct and send the response JSON
        res.json({
            productResults
            // businesses: businessResults,
            // services: serviceResults
        });
    } catch (error) {
        // If an error occurs, log it and return a server error response
        console.error('Error in generalSearch:', error);
        res.status(500).json({ error: error.message || "An unexpected error occurred." });
    }
};

module.exports = {
    generalSearch
};