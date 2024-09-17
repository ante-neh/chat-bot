// utils/imageToBase64.js
const axios = require('axios');

async function imageToBase64(imageUrl) {
    try {
        const response = await axios.get(imageUrl, {
            responseType: 'arraybuffer' // Important for handling binary data
        });
        const base64 = Buffer.from(response.data, 'binary').toString('base64');
        return base64;
    } catch (error) {
        console.error('Error downloading or converting image:', error.message);
        throw error;
    }
}

module.exports = imageToBase64;
