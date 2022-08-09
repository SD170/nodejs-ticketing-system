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
//load env vars
dotenv_1.default.config({ path: __dirname + '/../config.env' });
// console.log(__dirname+'/../config.env');
// console.log(process.env.MONGOPORT);
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
