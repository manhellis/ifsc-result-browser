const fs = require('fs');
const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myDatabase';

// Collection Name
const collectionName = 'myCollection';

// Directory path containing the JSON files
const directoryPath = '/path/to/json/files';

// Function to read and insert JSON files
async function uploadJSONFiles() {
  try {
    // Create a new MongoClient
    const client = new MongoClient(uri);

    // Connect to the MongoDB server
    await client.connect();

    // Get the database
    const db = client.db(dbName);

    // Get the collection
    const collection = db.collection(collectionName);

    // Read the directory
    const files = fs.readdirSync(directoryPath);

    // Iterate over the files
    for (const file of files) {
      // Read the JSON file
      const data = fs.readFileSync(`${directoryPath}/${file}`, 'utf8');

      // Parse the JSON data
      const jsonData = JSON.parse(data);

      // Insert the JSON data into the collection
      await collection.insertOne(jsonData);
    }

    console.log('JSON files uploaded successfully.');

    // Close the connection
    await client.close();
  } catch (error) {
    console.error('Error uploading JSON files:', error);
  }
}

// Call the function to upload JSON files
uploadJSONFiles();
