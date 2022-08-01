"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const recipe_1 = require("../models/recipe");
const user_1 = require("../models/user");
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)('week-9-node-task-sq011-poda-leslie-bund:server');
const books = [
    {
        title: 'Ope',
        author: 'Ope'
    },
    {
        title: 'Ade',
        author: 'Ade'
    }
];
const resolvers = {
    Query: {
        books: () => books,
        user: async (_, { id }) => {
            return await user_1.userData.findById(id);
        },
        users: async () => {
            return await user_1.userData.find({});
        },
        recipes: async () => {
            return await recipe_1.recipeData.find({});
        },
    }
};
exports.default = resolvers;
