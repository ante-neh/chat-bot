const OpenAIApi = require("openai");
const dotenv = require("dotenv");
const path = require('path');
const Business = require('../models/businessModel');
const BusinessEmbedding = require('../models/businessEmbedding');
const { cosineSimilarity } = require('../utils/vectorUtils');
const convertKeysToLowercase = require('../utils/convertKeysToLowercase');

// Configure dotenv to load the .env file from the correct path
dotenv.config({ path: path.join(__dirname, '../../.env') });

const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAIApi({
  apiKey: apiKey,
});

async function createBusinessEmbedding(text, entityId) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });

    const embeddingValue = response.data[0].embedding;

    let existingEmbedding = await BusinessEmbedding.findOne({ entityId });

    if (existingEmbedding) {
      existingEmbedding.embeddingValue = embeddingValue;
      await existingEmbedding.save();
    } else {
      existingEmbedding = new BusinessEmbedding({ entityId, embeddingValue });
      await existingEmbedding.save();
    }
    return existingEmbedding;
  } catch (error) {
    console.error("Error creating business embedding:", error.message);
    throw error;
  }
}

async function searchBusinessEmbeddings(query, page = 1, limit = 10) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: query,
    });

    const queryEmbedding = response.data[0].embedding;
    const embeddings = await BusinessEmbedding.find();

    const results = [];
    for (const embedding of embeddings) {
      const business = await findBusiness(embedding.entityId);
      if (business) {
        const similarity = cosineSimilarity(queryEmbedding, embedding.embeddingValue);
        results.push({ business, similarity });
      }
    }

    results.sort((a, b) => b.similarity - a.similarity);
    const startIndex = (page - 1) * limit;
    const paginatedResults = results.slice(startIndex, startIndex + limit).map(result => result.business);

    const finalResult = convertKeysToLowercase(paginatedResults);

    return finalResult;
  } catch (error) {
    console.error("Error searching business embeddings:", error.message);
    throw error;
  }
}

async function findBusiness(businessId) {
  try {
    const businessDetails = await Business.findById(businessId);
    if (!businessDetails) {
      throw new Error('No business found with the given ID: ' + businessId);
    }
    return businessDetails;
  } catch (error) {
    console.error('Error fetching business details:', error.message);
    throw error;
  }
}

async function generateBusinessEmbeddings() {
  try {
    const businesses = await Business.find({});
    for (const business of businesses) {
      const text = `${business.name} ${business.description} ${business.category} ${business.location}`;
      const objectId = business._id;
      await createBusinessEmbedding(text, objectId);
    }
    console.log('Business embeddings created');
  } catch (error) {
    console.error('Failed to generate embeddings:', error.message);
  }
}

module.exports = {
  createBusinessEmbedding,
  searchBusinessEmbeddings,
  generateBusinessEmbeddings
};

if (require.main === module) {
  generateBusinessEmbeddings();
}
