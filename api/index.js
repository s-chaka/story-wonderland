import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import axios from 'axios';
import path from 'path';
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

//example api
export const fetchData = async () => {
  const response = await axios.get('https://api.example.com/data');
  return response;
};
export default app;

if (import.meta.url == `file://${process.argv[1]}`) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log('Server is running on port 3000!!');
  }
  );
};


app.get('/test', (req, res) => {
  res.send('This is just a test!!');
}
);

app.use(express.static(path.join(__dirname, 'client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
