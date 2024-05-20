import dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import cors from "cors";
import bodyParser from "body-parser";
import express from "express";

import { typeDefs } from "./src/core/typeDefs.js";
import { resolvers } from "./src/core/resolvers.js";

import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { makeExecutableSchema } from "@graphql-tools/schema";

const startServer = async () => {
    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const app = express();
    const httpServer = createServer(app);

    const server = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
        ],
        csrfPrevention: false,

    });

    await server.start();

    app.use("/graphql",
        cors(),
        bodyParser.json(),
        expressMiddleware(server, {
            context: async ({ req }) => {
                const token = req.headers.authorization || "";

                try {
                    return { user: jwt.verify(token.split(" ", 2)[1], process.env.ACCESS_SECRET) };
                } catch (error) {
                    return { user: { id: null } };
                }
            }
        }
        ));

    await mongoose.connect(process.env.DB_CONNECTION);
    // app.listen({ port: process.env.PORT }, () => console.log(`Server ready at http://localhost:${process.env.PORT}/graphql 🚀 `));
    httpServer.listen(process.env.PORT, () => {
        console.log(`Server is now running on http://localhost:${process.env.PORT}/graphql`);
    });
};

startServer();
