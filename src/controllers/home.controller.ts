import mongoose from "mongoose";
import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import UserModel from "../models/User.model";
import asyncHandler from "../middlewares/async";
import ErrorResponse from '../utils/ErrorResponse';


//  @desc       display welcome
//  @route      Get /
//  @access     Public
export const welcomeDisplay = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const responseHtml = `
  <h1>All the routes</h1>
  <h2>Click <a href="https://github.com/SD170/nodejs-ticketing-system/tree/master/README.md">here</a> for endpoint details</h2>
  <h2>Click <a href="https://github.com/SD170/nodejs-ticketing-system/tree/master/_data/interim.postman_collection.json">here</a> for postman collection</h2>

  <ul>
    <li>http://nodejs-ticketing-system.herokuapp.com/api/v1/users/new <div>POST</<div></li>
    <li>http://nodejs-ticketing-system.herokuapp.com/api/v1/tickets/new <div>POST</<div></li>
    <li>http://nodejs-ticketing-system.herokuapp.com/api/v1/tickets/all <div>GET</<div></li>
    <li>http://nodejs-ticketing-system.herokuapp.com/api/v1/tickets <div>GET</<div></li>
    <li>http://nodejs-ticketing-system.herokuapp.com/api/v1/tickets/markAsClosed <div>POST</<div></li>
    <li>http://nodejs-ticketing-system.herokuapp.com/api/v1/tickets/delete <div>POST</<div></li>
  </ul>


 `
  res.status(200)
    .send(responseHtml)

});