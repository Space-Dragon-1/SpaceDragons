import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';

const userRouter = express.Router();

userRouter.post(
  '/login',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      }
    }
  })
);
