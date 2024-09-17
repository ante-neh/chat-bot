const OpenAIApi = require("openai");
const dotenv = require("dotenv");
const path = require('path');
const Service = require('../models/serviceModel');
const ServiceEmbedding = require('../models/serviceEmbedding');
const { cosineSimilarity } = require('../utils/vectorUtils');
const convertKeysToLowercase = require('../utils/convertKeysToLowercase');

// Configure dotenv to load the .env file from the correct path
dotenv.config({ path: path.join(__dirname, '../../.env') });

const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAIApi({
  apiKey: apiKey,
});

async function createServiceEmbedding(text, entityId) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });

    const embeddingValue = response.data[0].embedding;

    let existingEmbedding = await ServiceEmbedding.findOne({ entityId });

    if (existingEmbedding) {
      existingEmbedding.embeddingValue = embeddingValue;
      await existingEmbedding.save();
    } else {
      existingEmbedding = new ServiceEmbedding({ entityId, embeddingValue });
      await existingEmbedding.save();
    }
    return existingEmbedding;
  } catch (error) {
    console.error("Error creating service embedding:", error.message);
    throw error;
  }
}

async function searchServiceEmbeddings(query, page = 1, limit = 10) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: query,
    });

    const queryEmbedding = response.data[0].embedding;
    const embeddings = await ServiceEmbedding.find();

    const results = [];
    for (const embedding of embeddings) {
      const service = await findService(embedding.entityId);
      if (service) {
        const similarity = cosineSimilarity(queryEmbedding, embedding.embeddingValue);
        results.push({ service, similarity });
      }
    }

    results.sort((a, b) => b.similarity - a.similarity);
    const startIndex = (page - 1) * limit;
    const paginatedResults = results.slice(startIndex, startIndex + limit).map(result => result.service);

    const finalResult = convertKeysToLowercase(paginatedResults);

    return finalResult;
  } catch (error) {
    console.error("Error searching service embeddings:", error.message);
    throw error;
  }
}

async function findService(serviceId) {
  try {
    const serviceDetails = await Service.findById(serviceId);
    if (!serviceDetails) {
      throw new Error('No service found with the given ID: ' + serviceId);
    }
    return serviceDetails;
  } catch (error) {
    console.error('Error fetching service details:', error.message);
    throw error;
  }
}

async function generateServiceEmbeddings() {
  try {
    const services = await Service.find({});
    for (const service of services) {
      const text = `${service.name} ${service.description} ${service.category} ${service.price}`;
      const objectId = service._id;
      await createServiceEmbedding(text, objectId);
    }
    console.log('Service embeddings created');
  } catch (error) {
    console.error('Failed to generate embeddings:', error.message);
  }
}

module.exports = {
  createServiceEmbedding,
  searchServiceEmbeddings,
  generateServiceEmbeddings
};

if (require.main === module) {
  generateServiceEmbeddings();
}
