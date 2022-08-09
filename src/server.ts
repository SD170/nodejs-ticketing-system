import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import fs from "fs";

//load env vars
dotenv.config({path: __dirname+'/../config.env'});

// console.log(__dirname+'/../config.env');
// console.log(process.env.MONGOPORT);


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

