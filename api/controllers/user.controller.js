import User from "../models/user.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";


export const updateUser = async (req, res, next) => {
  if(req.user.id !== req.params.id){
    return next(errorHandler(401, 'You can only update your account!'));
  }
  try {
    if(req.body.password){
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        profilePic: req.body.profilePic
      },
    }, 
    {new: true});
    const { password, ...userInfo } = updatedUser._doc;
    res.status(200).json(userInfo);
  } catch(error){
    next(error);
  }
};


// delete user
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can only delete your account!'));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted...');
  } catch (error){
    next(error);
  }
};
