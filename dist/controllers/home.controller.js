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
exports.welcomeDisplay = void 0;
const async_1 = __importDefault(require("../middlewares/async"));
//  @desc       display welcome
//  @route      Get /
//  @access     Public
exports.welcomeDisplay = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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


 `;
    res.status(200)
        .send(responseHtml);
}));
