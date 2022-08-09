export {};

declare global {
  namespace Express {
    interface Request {
      user: string|JwtPayload;
      ticketPriority:string,
      ticketAssigned:mongoose.Types.ObjectId,
    }
  }
}