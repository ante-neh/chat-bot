const { searchProductEmbeddings } = require('../services/productEmbeddingService');
const { searchBusinessEmbeddings } = require('../services/businessEmbeddingService');
const { searchServiceEmbeddings } = require('../services/serviceEmbeddingService');

async function searchEmbeddings(query, page = 1, limit = 20) {
  try {

    if (!query){
        return {};
    }
    const result = { products: [], services: [], businesses: [] };

    console.log(query);
    const objectType = query.objectType;
    const searchString =  query.searchString;
    const subCatagory = query.subCategory;

    console.log(searchString);
    
    if(objectType === "Business"){
        result.businesses = await searchBusinessEmbeddings(searchString, page, 5);

    }else if(objectType === 'Service'){
        result.services = await searchServiceEmbeddings(searchString, page, 5);

    }else{
        console.log(subCatagory);
        result.products = await searchProductEmbeddings(searchString, subCatagory, page, 5);
    }

    return result;

  } catch (error) {
    console.error("Error searching embeddings:", error.message);
    throw error;
  }
}

module.exports = searchEmbeddings

if (require.main === module) {
    searchEmbeddings();
}
