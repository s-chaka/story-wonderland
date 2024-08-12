import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// signup api route
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword});
  try {
    await newUser.save();
  res.status(201).json('User created successfully!');
  } catch (error) {
    next(error); 
  }  
};

// signin api route
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found!'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Incorrect username/password'));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }, { expiresIn: '1h' });
    const { password: pass, ...userInfo } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000); 
    res.cookie('access_token', token, { httpOnly: true, expires:expiryDate, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' })
      .status(200)
      .json(userInfo);
  } catch (error) {
    next(error);
  }
};

// google signin api route
export const google= async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY,{ expiresIn: '1h' });
      const { password: hashedPassword, ...userInfo} = user._doc;
      const expiryDate = new Date(Date.now() + 3600000);
      res.cookie('access_token', token, { httpOnly: true, expires: expiryDate, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' })
        .status(200)
        .json(userInfo);
    } else {
      //this function generates a random password for the user and hashes it before saving it to the database 
      //this function generates a random password for the user and hashes it before saving it to the database 
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({ 
        username: req.body.name.split(" ").join("").toLowerCase().toString(), 
        email:req.body.email, 
        password: hashedPassword, 
        profilePic: req.body.photo
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
      const { password: hashedPassword2, ...userInfo} = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000);//1 hour
      res.cookie('access_token', token, { httpOnly: true, expires: expiryDate, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' })
        .status(200)
        .json(userInfo);
    }
  }catch (error) {
    next(error);
  }
};

// signout api route
export const signout = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('Signout successful!');
  } catch (error) {
    next(error);
  }
};


// get user id from token
export const getUserId = async (req, res) => {
    try {
        const token = req.cookies.access_token; // Retrieve token from cookies

        if (!token) {
          console.error('Token not found.');
          return res.status(401).json({ error: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify token
        res.json({ userId: decoded.id }); // Respond with userId
    } catch (error) {
        console.error('Error decoding JWT:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
