function convertDocKeysToLowercase(objects) {
    const result = [];

    // Helper function to convert keys to lowercase
    function convertKeys(obj) {
        const newObj = {};
        Object.keys(obj).forEach(key => {
            // Preserve '_id' and 'images' keys
            if (key === '_id' || key === 'images') {
                if(key == '_id'){
                    newObj['id'] = obj['_id'];
                }else{
                    newObj[key] = obj[key];
                }
            } else {
                const newKey = key.charAt(0).toLowerCase() + key.slice(1);
                const value = obj[key];

                if (value !== null && typeof value === 'object') {
                    if (Array.isArray(value)) {
                        newObj[newKey] = value.map(item => {
                            if (typeof item === 'object' && item !== null) {
                                return convertKeys(item); // Recurse for each item if it's an object
                            } else {
                                return item; // Return the item unchanged if it's not an object
                            }
                        });
                    } else {
                        newObj[newKey] = convertKeys(value); // Recurse for nested objects
                    }
                } else {
                    newObj[newKey] = value; // Copy value directly
                }
            }
        });
        return newObj;
    }

    for (const object of objects) {
        if (object._doc) {
            const transformedDoc = convertKeys(object._doc);
            console.log(object._doc); // Log original _doc
            console.log(transformedDoc); // Log transformed _doc
            result.push(transformedDoc);
        } else {
            console.error('No _doc found in object:', object);
            result.push(null); // or continue; depending on whether you want to skip or mark it as null
        }
    }

    return result;
}

module.exports = convertDocKeysToLowercase;
