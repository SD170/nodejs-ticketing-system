import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/ErrorResponse";
import { Request, Response, NextFunction } from 'express';
import TicketModel from '../models/Ticket.model';
import asyncHandler from './async';
import ROLES from "../utils/roleList";


export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const AuthorizationHeader = req.header("Authorization");
    if (!AuthorizationHeader) {
        next(new ErrorResponse(`Access Denied`, 401));
    }

    const token = AuthorizationHeader!.split(" ")[1];

    // checking for TOKEN_SECRET from env
    if (process.env.TOKEN_SECRET === undefined) {
        return next(new ErrorResponse("please provide a secret for jwt"))
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        next(new ErrorResponse(`Invalid Token`, 401));
    }
};

export const checkRole = (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.user.role === role) {
            next();
        } else {
            next(new ErrorResponse(`Don't have permission`, 401));
        }
    };
};

export const checkTicketClosingValidity = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.ticketID) {
        next(new ErrorResponse(`Please provide a ticketID`, 400));
    }
    const ticket = await TicketModel.findById(req.body.ticketID);
    if (!ticket) {
        next(new ErrorResponse(`There's no ticket with this ticketID`, 400));
    }

    if(ticket?.status === "close"){
        next(new ErrorResponse(`Ticket is already closed`, 400));
    }

    // @ts-ignore
    if (ticket!.assignedTo.toString() !== req.user._id && req.user.role !== ROLES.ADMIN) {
        next(new ErrorResponse(`You don't have permission to remove this ticket`, 400));
    }

    if(typeof ticket!.priority === 'string'){
        req.ticketPriority = ticket!.priority
    }
    if(ticket!.assignedTo!._id){
        req.ticketAssigned = ticket!.assignedTo!._id
    }
    next();
});

