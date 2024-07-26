import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);
    const { password: pass, ...userInfo } = validUser._doc;
    res.cookie('access_token', token, { httpOnly: true})
    .status(200)
    .json(userInfo);
  } catch (error) {
    next(error);
  }
}
