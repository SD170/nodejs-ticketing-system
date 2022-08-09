"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_model_1 = __importDefault(require("../models/User.model"));
const async_1 = __importDefault(require("../middlewares/async"));
const ErrorResponse_1 = __importDefault(require("../utils/ErrorResponse"));
//  @desc       create single user
//  @route      POST /api/v1/users/new
//  @access     Public
exports.createUser = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // creating a new user 
    const user = new User_model_1.default({
        username: req.body.username,
        role: req.body.role
    });
    // checking for TOKEN_SECRET from env
    if (process.env.TOKEN_SECRET === undefined) {
        return next(new ErrorResponse_1.default("please provide a secret for jwt"));
    }
    // saving the created user
    const savedUser = yield user.save();
    // payload for jwt
    const jwtPayload = {
        _id: savedUser._id,
        username: savedUser.username,
        role: savedUser.role
    };
    //jwt sign
    const token = jsonwebtoken_1.default.sign(jwtPayload, process.env.TOKEN_SECRET, {
        expiresIn: "365d"
    });
    res.status(200)
        .header("Authorization", `jwt ${token}`)
        .json({
        success: true,
        message: `User created`,
        data: savedUser,
    });
}));
