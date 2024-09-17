const use = require('@tensorflow-models/universal-sentence-encoder');

let model = null;

const loadModel = async () => {
  if (!model) {
    try {
      model = await use.load();
      console.log('TensorFlow model loaded successfully');
    } catch (error) {
      console.error(error.message);
      throw error;  // Ensure the error is caught if the model fails to load
    }
  }
  return model;
};

const getModel = () => {
  if (!model) {
    throw new Error('Model not loaded yet');
  }
  return model;
};

module.exports = { loadModel, getModel };
