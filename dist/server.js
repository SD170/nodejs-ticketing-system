"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const connection_1 = __importDefault(require("./db/connection"));
const error_1 = __importDefault(require("./middlewares/error"));
//load env vars
dotenv_1.default.config({ path: __dirname + '/../config.env' });
//Connect to database
(0, connection_1.default)();
//route files
const user_route_1 = __importDefault(require("./routes/user.route"));
const ticket_route_1 = __importDefault(require("./routes/ticket.route"));
const app = (0, express_1.default)();
//body parser
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('common', {
    stream: fs_1.default.createWriteStream('./morgan.log', { flags: 'a' })
}));
//dev logging middleware
if (process.env.NODE_ENV === 'development') { //only when using dev env
    app.use((0, morgan_1.default)('dev'));
}
//mount routers
app.use('/api/v1/users', user_route_1.default);
app.use('/api/v1/tickets', ticket_route_1.default);
//error middleware. create a response - should be at last
app.use(error_1.default);
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`);
});
//handle unhandled PromeseRejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    //Close Server & exit process
    server.close(() => process.exit(1));
});
