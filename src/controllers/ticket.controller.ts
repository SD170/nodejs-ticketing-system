import mongoose from "mongoose";
import { Request, Response, NextFunction } from 'express';
import TicketModel from "../models/Ticket.model";
import UserModel from "../models/User.model";
import asyncHandler from "../middlewares/async";
import ErrorResponse from '../utils/ErrorResponse';


//  @desc       create a ticket
//  @route      POST /api/v1/tickets/new
//  @access     Private: Admin
export const createTicket = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { title, description, assignedTo } = req.body;
  
  // fetching employee user from username
  if (!assignedTo) {
    return next(new ErrorResponse("Please provide a employee username with assignedTo"));

  }
  const employee = await UserModel.findOne({ username: assignedTo });
  
  // employe username validity check
  if (!employee) {
    return next(new ErrorResponse("Please provide a valid employee username"));
  }
  
  // creating a new ticket 
  const ticket = new TicketModel({
    title,
    description,
    assignedTo: employee?._id
  });

  // saving the created user
  const savedTicket = await ticket.save();

  res.status(200)
    .json({
      success: true,
      message: `Ticket created`,
      data: savedTicket,
    });

});


//  @desc       get all tickets
//  @route      GET /api/v1/tickets
//  @access     Private
export const getAllTickets = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const allTickets = await TicketModel.find({ ...req.query });
  res.status(200).json({
    success: true,
    message: `Ticket fetched successfully`,
    data: allTickets
  });
});
