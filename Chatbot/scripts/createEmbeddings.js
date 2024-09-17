const { generateProductEmbeddings } = require('../services/productEmbeddingService');
const { generateServiceEmbeddings } = require('../services/serviceEmbeddingService');
const { generateBusinessEmbeddings } = require('../services/businessEmbeddingService');

async function generateEmbeddings() {
    try {
        await generateProductEmbeddings();
        // await generateServiceEmbeddings();
        // await generateBusinessEmbeddings();
        
        console.log('Embeddings created');
    } catch (error) {
        console.error('Failed to generate embeddings:', error);
    }
}

module.exports = generateEmbeddings;

// If this script is being run directly, invoke generateBusinessEmbeddings
if (require.main === module) {
    generateEmbeddings();
}