import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import fs from "fs";
import connectDB from "./db/connection";
import errorHandler from './middlewares/error';

//load env vars
dotenv.config({path: __dirname+'/../config.env'});

//Connect to database
connectDB();

//route files
import userRoutes from "./routes/user.route";
import ticketRoutes from "./routes/ticket.route";
import homeRoutes from "./routes/home.route";


const app = express();


//body parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use(morgan('common', {
    stream: fs.createWriteStream('./morgan.log', {flags: 'a'})
}));
//dev logging middleware
if(process.env.NODE_ENV==='development'){   //only when using dev env
    app.use(morgan('dev'));
}



//mount routers
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/tickets',ticketRoutes);
app.use('/',homeRoutes);


//error middleware. create a response - should be at last
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, ()=>{
    console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`)
});

//handle unhandled PromeseRejection
process.on('unhandledRejection',(err:any,promise)=>{
    console.log(`Error: ${err.message}`);
    
    //Close Server & exit process
    server.close(()=> process.exit(1));
})

