import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import storyRouter from './routes/story.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(() => {
  console.log('Connected to MongoDB!!');
})
.catch((err) => {
  console.log(err);
}
);

const __dirname = path.resolve();

const app = express();
const corsOptions = {
  origin: 'http://localhost:5173',// frontend url
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json()); 
app.use(cookieParser()); 


app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api', storyRouter);

// middleware that handles possible errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 400;
  const message = err.message || 'bad request';
  return res.status(statusCode).json({ 
    success: false,
    statusCode,
    message,
  });
});

// serves static files from vite's build output.This line configures the application to serve static files (like HTML, CSS, and JavaScript) from the client/dist directory.
app.use(express.static(path.join(__dirname, 'client/dist')));

// catch-all route
//This line defines a catch-all route handler. When any GET request is made that doesn't match a specific route defined earlier, the function serves the index.html file from the client/dist directory.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});


if (
  import.meta.url == `file://${process.argv[1]}`
  ) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log('Server is running on port 3000!!');
  }
  );
};
