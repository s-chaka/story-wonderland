// uploadImagesFromURLs.js
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Buffer } from 'buffer'; // Use Node.js Buffer
import { fileURLToPath } from 'url';
import axios from 'axios';
// import fs from 'fs';
// import path from 'path';
// import { promisify } from 'util';

import dotenv from 'dotenv';
dotenv.config();

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Function to download image from URL and upload to Firebase Storage
const uploadImageFromUrl = async (imageUrl, genre) => {
  try {
    // Download the image
    const response = await axios({
      url: imageUrl,
      responseType: 'arraybuffer',
    });
     // Extract filename from URL
    const fileName = imageUrl.split('/').pop();
    const storageRef = ref(storage, `images/${genre}/${fileName}`);
    const fileBuffer = Buffer.from(response.data);

    // Upload the image to Firebase Storage
    await uploadBytes(storageRef, fileBuffer);
    const imageUrlInStorage = await getDownloadURL(storageRef);
    console.log(`Uploaded ${fileName} to Firebase Storage. URL: ${imageUrlInStorage}`);
    return imageUrlInStorage;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Main function to process images
const processImages = async () => {
  const imageUrls = [
    'https://wallpapers.com/images/hd/wonderland-1920-x-1200-background-er29o36006nb2lws.jpg'
    // Add more URLs
  ];
  const genre = 'fantasy';

  for (const imageUrl of imageUrls) {
    try {
      const uploadedImageUrl = await uploadImageFromUrl(imageUrl, genre);
      console.log(`Image uploaded: ${uploadedImageUrl}`);
    } catch (error) {
      console.error(`Failed to upload image from ${imageUrl}:`, error);
    }
  }
};

processImages();