"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHigherPriorityTitles = void 0;
const prioriyList_1 = __importDefault(require("./prioriyList"));
const getHigherPriorityTitles = (priority) => {
    const sortedPriorities = Object.values(prioriyList_1.default).sort((p1, p2) => {
        return p2.PRIORITY - p1.PRIORITY;
    });
    const sortedPrioritiesTitles = sortedPriorities.map(p => p.TITLE);
    console.log("sortedPrioritiesTitles", sortedPrioritiesTitles);
    const priorityIdx = sortedPrioritiesTitles.indexOf(priority);
    if (priorityIdx === -1) {
        throw ("invalidvalid priority");
    }
    console.log("sortedPrioritiesTitles.slice(priorityIdx+1)", sortedPrioritiesTitles.slice(priorityIdx + 1));
    return sortedPrioritiesTitles.slice(priorityIdx + 1);
};
exports.getHigherPriorityTitles = getHigherPriorityTitles;
