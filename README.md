# Story Wonderland

Welcome to **Story-Wonderland** repository! This web app generates fun and engaging stories based on user-selected genres, using the llama API. Designed for kids under 10 years old, the app offers a playful and interactive experience.


## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Express.js
- **Database**: MongoDB
- **Testing**: Vitest
- **State Management**: Redux, react-redux, redux-persist
- **API**: llama API for story generation


## Prerequisites for Backend Set up

Before you start, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.x or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/try/download/community) 

## Setup and Configuration

1. **Clone the Repository**

   git clone https://github.com/s-chaka/story-wonderland-backend.git
   if already cloned skip cloning and cd story-wonderland

2.	**Install Dependencies**
    npm install

3.	**Create a .env File**
    add and update the values according to your environment:
    •	MONGODB_URI = Your MongoDB connection string
	•	JWT_SECRET = Your JWT secret key
	•	LLAMA_API_KEY: Your llama Api Key
	•	VITE_FIREBASE_API_KEY = Your Firebase Api Key
	•	FIREBASE_STORAGE_BUCKET: Your Firebase storage bucket URL

4.	**Firebase Configuration**
    Ensure you have set up Firebase and added your credentials in the .env file.
5.	**Update Routes and Configuration**
	• Update any route configurations or middleware as needed in index.js and routes/.

## Running the Application
	1.	Running in Development Mode
        For development:`npm run dev`

## API Endpoints: Main API endpoints available:

	Auth Routes
	•	POST /api/signup
	•	POST /api/signin
	•	POST /api/google-signin
	•	GET /api/signout
	•	GET /api/get-user-id

	User Routes
	•	POST /api/update/:id
	•	DELETE /api/delete/:id
	
	Story Routes
	•	POST /api/generate-story
	•	POST /api/continue-story
	•	POST /api/end-story
	•	POST /api/save-story
	•	GET /api/saved-stories/:userId
	
	Miscellaneous Routes
	•	GET /api/get-background-image-url

## Front-end Installation

To get started with Story-Wonderland, follow these steps:

1. **Clone the repository:**

   git clone https://github.com/s-chaka/story-wonderland.git
   cd story-wonderland/client

2. **Install dependencies:**

    npm install

3. **Set up environment variables:**

    VITE_FIREBASE_API_KEY=your_api_key_here

4. **Run the development server:**

    npm run dev

    The app will be available at http://localhost:3000

## Usage

1. **Sign In/Sign Out::** 

    Use the Signin and Signout pages to authenticate and manage your sessions.

2. **Dashboard:**

    Select genres to generate stories. View the stories in the Story page.

3. **Saved Stories:**

    Access and manage stories you've saved.

4. **About**

    Learn more about Story-Wonderland.

## Testing
1. **Run Tests**
npm test

2. **Mocking Dependencies**
Tests use vi.mock for mocking dependencies.