"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_core_1 = require("apollo-server-core");
const typeDefs = (0, apollo_server_core_1.gql) `
    # Lets begin defining schema types

    enum Meal {
        breakfast
        lunch
        supper
        snack
    }

    enum Difficulty {
        Beginner
        Intermediate
        Advanced
    }

    input Ingre {
        name: String!
        price: String!
    }
    type Ingredient {
        name: String!
        price: String!
    }

    type Recipe {
        id: ID!
        title: String!
        meal_type: Meal!
        difficulty_level: Difficulty!
        preparation: String!
        ingredients: [Ingredient!]!
        creator: String!
        createdAt: String!
        updatedAt: String!
    }

    type User {
        id: ID!
        email: String!
        password: String!
        fullname: String!
        recipes: Int!
        createdAt: String!
        updatedAt: String!
    }

    input newRecipe {
        title: String!
        meal_type: Meal!
        difficulty_level: Difficulty!
        preparation: String!
        ingredients: [Ingre!]!
    }

    input newUser {
        email: String!
        password: String!
        fullname: String!
        recipes: Int!
    }

    type Book {
        title: String
        author: String
    }

    type Query {
        books: [Book]
        user(id: String): User! 
        users: [User!]!
        recipes: [Recipe!]!
    }
`;
exports.default = typeDefs;
