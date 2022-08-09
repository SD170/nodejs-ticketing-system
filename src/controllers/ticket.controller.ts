import mongoose from "mongoose";
import { Request, Response, NextFunction } from 'express';
import TicketModel from "../models/Ticket.model";
import UserModel from "../models/User.model";
import asyncHandler from "../middlewares/async";
import ErrorResponse from '../utils/ErrorResponse';
import { getHigherPriorityTitles } from '../utils/herlper';



//  @desc       create a ticket
//  @route      POST /api/v1/tickets/new
//  @access     Private: Admin
export const createTicket = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { assignedTo } = req.body;

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
    ...req.body,
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

//  @desc       close a ticket
//  @route      POST /api/v1/markAsClosed
//  @access     Private
export const closeTicket = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const ticketPriority = req.ticketPriority // from checkTicketClosingValidity middleware
  const ticketAsignee = req.ticketAssigned // from checkTicketClosingValidity middleware
  const higherPriorityArr = getHigherPriorityTitles(ticketPriority); // fething all the higher priorities



  const higherPriorityTickets = await TicketModel.find({
    assignedTo: ticketAsignee,
    priority: { $in: higherPriorityArr }
  });


  if (higherPriorityTickets.length > 0) {
    return res.status(400).json({
      success: false,
      message: `${higherPriorityTickets.length} higher priority task remains to be closed`,
      data: higherPriorityTickets
    });
  }

  // close the ticket
  const updatedTicket = await TicketModel.findByIdAndUpdate(req.body.ticketID, {
    status: "close"
  }, {
    new: true
  });


  res.status(200).json({
    success: true,
    message: `Ticket closed successfully`,
    data: updatedTicket
  });
});


//  @desc       delete a ticket
//  @route      POST /api/v1/delete
//  @access     Private: Admin
export const deleteTicket = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { ticketID } = req.body;

  const deletedTicket = await TicketModel.findOneAndRemove({ _id: ticketID });

  if (!deletedTicket) {
    return next(new ErrorResponse("no ticket to delete with this id", 400));
  }

  res.status(200).json({
    success: true,
    message: `Ticket deleted successfully`,
    data: deletedTicket
  });
});