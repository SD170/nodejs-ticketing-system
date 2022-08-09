import mongoose from "mongoose";
import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import UserModel from "../models/User.model";
import asyncHandler from "../middlewares/async";


//  @desc       create single user
//  @route      POST /api/v1/users/new
//  @access     Public
export const createUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // creating a new user 
  const user = new UserModel({
    username: req.body.username,
    role: req.body.role
  });

  // checking for TOKEN_SECRET from env
  if (process.env.TOKEN_SECRET === undefined) {
    next("please provide a secret for jwt")
  }

  // saving the created user
  const savedUser = await user.save();

  // payload for jwt
  const jwtPayload = {
    _id: savedUser._id,
    username: savedUser.username,
    role: savedUser.role
  }

  //jwt sign
  const token = jwt.sign(jwtPayload, process.env.TOKEN_SECRET!, {
    expiresIn: "365d"
  });


  res.status(200)
    .header("Authorization", `jwt ${token}`)
    .json({
      success: true,
      message: `User created`,
      data: savedUser,
    });

});