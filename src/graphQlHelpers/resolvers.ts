import { gql } from "apollo-server-core";
import { recipeData } from "../models/recipe";
import { userData } from "../models/user";
import Debug from 'debug';
const debug = Debug('week-9-node-task-sq011-poda-leslie-bund:server');

const books = [
    {
      title: 'Ope',
      author: 'Ope'
    },
    {
      title: 'Ade',
      author: 'Ade'
    }
  ]
  
const resolvers = {
    Query: {
        books: () => books,
        user: async (_:any, { id }: {[k: string]: string}) => {
            return await userData.findById(id);
        },
        users: async () => {
            return await userData.find({});
        },
        recipes: async () => {
            return await recipeData.find({});
        },
    }
}

export default resolvers;