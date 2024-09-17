const OpenAIApi = require("openai");
const dotenv = require("dotenv");
const path = require('path');
const Product = require('../models/productModel');
const ProductEmbedding = require('../models/productEmbedding');
const { cosineSimilarity } = require('../utils/vectorUtils');
const convertKeysToLowercase = require('../utils/convertKeysToLowercase');

// Configure dotenv to load the .env file from the correct path
dotenv.config({ path: path.join(__dirname, '../../.env') });

const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAIApi({
  apiKey: apiKey,
});

async function createProductEmbedding(text, entityId, subCategory) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });
    const embeddingValue = response.data[0].embedding;
    let existingEmbedding = await ProductEmbedding.findOne({ entityId });

    if (existingEmbedding) {
      existingEmbedding.embeddingValue = embeddingValue;
      await existingEmbedding.save();
    } else {
      existingEmbedding = new ProductEmbedding({ entityId, embeddingValue, subCategory});
      await existingEmbedding.save();
    }
    return existingEmbedding;
  } catch (error) {
    console.error("Error creating product embedding:", error.message);
    throw error;
  }
}

async function searchProductEmbeddings(query, subCategory, page = 1, limit = 10) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: query,
    });

    const queryEmbedding = response.data[0].embedding;
    // Filter embeddings directly by subCategory in the MongoDB query
    const embeddings = await ProductEmbedding.find({ subCategory });

    const results = [];
    for (const embedding of embeddings) {
      const product = await findProducts(embedding.entityId);
      if (product) {
        const similarity = cosineSimilarity(queryEmbedding, embedding.embeddingValue);
        results.push({ product, similarity });
      }
    }

    results.sort((a, b) => b.similarity - a.similarity);
    const startIndex = (page - 1) * limit;
    const paginatedResults = results.slice(startIndex, startIndex + limit).map(result => result.product);

    const finalResult = convertKeysToLowercase(paginatedResults);
    return finalResult;
  } catch (error) {
    console.error("Error searching product embeddings:", error.message);
    throw error;
  }
}

async function findProducts(productId) {
  try {
    const productDetails = await Product.findById(productId);
    if (!productDetails) {
      throw new Error('No product found with the given ID: ' + productId);
    }
    return productDetails;
  } catch (error) {
    console.error('Error fetching product details:', error.message);
    throw error;
  }
}

async function generateProductEmbeddings() {
  try {
    const products = await Product.find({});
    for (const product of products) {
      // Convert Mongoose document to a plain JavaScript object
      const productData = product.toObject();

      const text = `${productData.Title} ${productData.Description} ${productData.Category} ${productData.Price}`;
      const objectId = productData._id;
      let subCategory = productData.Category;

      if(subCategory === 'Vehicle'){
        subCategory = "Car";
      }else if(subCategory === 'House'){
        subCategory = "House";
      }

      await createProductEmbedding(text, objectId, subCategory);
    }
    console.log('Product embeddings created');
  } catch (error) {
    console.error('Failed to generate embeddings:', error.message);
  }
}


module.exports = {
  createProductEmbedding,
  searchProductEmbeddings,
  generateProductEmbeddings
};

if (require.main === module) {
  generateProductEmbeddings();
}
