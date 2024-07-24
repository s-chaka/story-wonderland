import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
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

app.listen(3000, () => {
  console.log('Server is running on port 3000!!');
}
);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/dist/index.html'));
});
