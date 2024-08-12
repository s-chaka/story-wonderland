import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Buffer } from 'buffer'; // Node.js Buffer
import axios from 'axios';
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
  const imageMap = [
    {
      genre: 'Animal Stories',
      urls: [
        'https://www.shutterstock.com/image-vector/cute-animals-books-animal-read-600nw-1978872422.jpg',
        'https://m.media-amazon.com/images/I/813WDWlw9ES._AC_UF894,1000_QL80_.jpg',
        'https://i.pinimg.com/originals/31/2c/06/312c06c145240598e7f2b8d357961581.jpg',
        'https://3.bp.blogspot.com/-K1DZHQO5xqw/WO8aeMTuWcI/AAAAAAAAA50/k22L8TQBEUEP_3MMGZy-Wfhi_nuZ0DTlgCLcB/s1600/maxresdefault.jpg',        
      ],
    },
    {
      genre: 'Bedtime Stories',
      urls: [
        'https://t3.ftcdn.net/jpg/06/26/73/00/360_F_626730047_EYg2KKVIwd2AS2M0D6KZAUbC8MF2S491.jpg',
        'https://i.pinimg.com/736x/ca/8e/e6/ca8ee6de0e99424de59ba386284e6238.jpg',
        'https://img.freepik.com/premium-photo/cute-night-sky-with-stars-kids-illustration_863013-122329.jpg',
        'https://i.pinimg.com/originals/6a/4b/45/6a4b451899a4e04adedcdda734c5c2fc.jpg',  
      ],
    },
    {
      genre: 'Fairy Tales',
      urls: [
        'https://png.pngtree.com/background/20230401/original/pngtree-cute-cartoon-background-for-childrens-picture-book-picture-image_2252185.jpg',
        'https://miro.medium.com/v2/resize:fit:1024/1*xGERLRZS-qGg2RYC0aacFQ.png',
        'https://www.backdropstyle.com/media/catalog/product/cache/1/image/650x/040ec09b1e35df139433887a97daa66f/k/-/k-12710.jpg', 
        
      ],
    },
      {
        genre: 'Family',
        urls: [
          'https://m.media-amazon.com/images/I/81C-T9mtUcL._AC_UF1000,1000_QL80_.jpg',
          'https://cdn.mos.cms.futurecdn.net/y3sAPf3zs2L94pRiJ4ccER.jpg',
          'https://i.redd.it/1n2u9p5yrqda1.jpg',
          'https://media.newyorker.com/photos/5f2300c146aba3f470f8a786/master/pass/Widdicombe-Bluey.jpg',
          
        ],
      },
    {
      genre: 'Fantasy',
      urls: [
        // 'https://wallpapers.com/images/hd/wonderland-1920-x-1200-background-er29o36006nb2lws.jpg',
        // 'https://thumbs.dreamstime.com/b/magical-whimsical-tiny-village-hills-children-s-story-book-seq-whimsical-magical-tiny-village-hidden-mystical-rolling-290041413.jpg',
        'https://static.vecteezy.com/system/resources/previews/024/039/905/non_2x/beautiful-fantasy-sweet-world-background-candyland-generative-ai-digital-illustration-photo.jpg',
      ],
    },
    {
      genre: 'Friendship',
      urls: [
        'https://png.pngtree.com/thumb_back/fh260/background/20230328/pngtree-children-reading-education-cartoon-background-image_2119912.jpg',
        'https://images.booksense.com/images/149/846/9780486846149.jpg',
        'https://blog.paultonspark.co.uk/app/uploads/2022/04/Peppa-Pig-and-her-Friends.jpg',        
      ],
    },
    {
      genre: 'Holiday',
      urls: [
        'https://sites.ced.ncsu.edu/ccerc/wp-content/uploads/sites/2/2022/12/Holiday_Party_BANNER.jpeg',
        'https://www.vidyard.com/media/Holiday-Video-Ideas-2019-1920x1080p.jpg',
        'https://www.bonigala.com/wp-content/uploads/2013/01/holiday-mood.jpg',   
      ],
    },
    {
      genre: 'Mystery',
      urls: [
        'https://c8.alamy.com/comp/2HN7A1X/black-african-american-boy-and-girl-stand-near-large-question-mark-concept-of-getting-knowledge-by-thoughtful-young-people-curious-children-ask-questions-and-look-for-answers-vector-illustration-2HN7A1X.jpg',
        'https://c8.alamy.com/comp/T55RMP/illustration-of-stickman-kids-with-a-mystery-book-with-question-mark-holding-a-magnifying-glass-flashlight-and-notes-T55RMP.jpg',
        'https://image.slidesdocs.com/responsive-images/background/cute-educational-book-powerpoint-background_553a6c7c14__960_540.jpg',
      ],
    },
    {
      genre: 'Pirate Adventures',
      urls: [
        'https://i.pinimg.com/474x/6c/3f/cc/6c3fcc1647eea7190c0d2bc4f7468836.jpg',        
      ],
    },
    {
      genre: 'Space Adventures',
      urls: [
        'https://img.freepik.com/premium-photo/science-fiction-wallpaper-cosmic-art_410516-22711.jpg',
        'https://theretrofuturist.com/wp-content/uploads/2019/01/space-cat-book-cover.jpg',
        'https://img.freepik.com/premium-photo/science-fiction-set-future-electronic-art-city-that-flies-floats_410516-34064.jpg',         
      ],
    },
    {
      genre: 'Superheroes',
      urls: [
        'https://wallpapers.com/images/featured/marvel-captain-america-pictures-w9n6ryri2sljuwzl.jpg',
        'https://media.newyorker.com/photos/593581e785bd115baccba6d2/master/pass/Lane-Ten-Things-about-Wonder-Woman.jpg',
        'https://wallpapers.com/images/featured/spiderman-background-oycfyb1ksermw921.jpg', 
      ],
    },
    // We Add more genres and URLs here
  ];

  for (const { genre, urls } of imageMap) {
    for (const imageUrl of urls) {
      try {
        const uploadedImageUrl = await uploadImageFromUrl(imageUrl, genre);
        console.log(`Image uploaded: ${uploadedImageUrl}`);
      } catch (error) {
        console.error(`Failed to upload image from ${imageUrl} in genre ${genre}:`, error);
      }
    }
  }
};

processImages();