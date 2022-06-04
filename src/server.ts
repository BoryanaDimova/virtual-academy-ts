import { ApolloServer } from "apollo-server-express"
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import express from "express"
import "reflect-metadata";
import mongoose from "mongoose";
import http from "http"
import cors from "cors";
import bodyParser from 'body-parser';
import { getSchema } from "./schema";
import dotenv from "dotenv";
import { Context } from "./auth/context";
import geoip from "geoip-lite";
import MobileDetect from "mobile-detect";
import { getUserFromToken } from "./auth/token";
import { expressjwt } from "express-jwt";

dotenv.config();

const graphQlPath = process.env.GRAPHQL_PATH;
const port = process.env.PORT;
const dbUrl = process.env.MONGODB_URL;
const HEADER_AUTH = 'authorization';

const auth = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    credentialsRequired: false,
   
}) ;


mongoose.connect(dbUrl, {
    autoIndex: true,
  }).then(() => {
    console.log("connected to mongoDB")
  }).catch((e) => {
    console.log(e);
  })
  
  async function startApolloServer() {
    console.log("start server");
    const app = express();
    const httpServer = http.createServer(app);
  
    app.use(
      graphQlPath,
      cors({
        origin: '*'
      }),
      bodyParser.json(),
      auth
    )
      
    const schema = await getSchema();
    console.log("schema");

    const server = new ApolloServer({
      schema,
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        ApolloServerPluginLandingPageGraphQLPlayground(),
      ],
      introspection: true,
      context: async ({req}) => {
        const ip = req.header['x-forwarded-for'] || req.socket.remoteAddress;
        // Get the user token from the headers.
        let authToken, currentUser;
        try {
          authToken = req.headers[HEADER_AUTH]
    
          if (authToken) {
            currentUser = await getUserFromToken(authToken)
          }
        } catch (e) {
          console.warn(`Unable to authenticate using auth token: ${authToken}`)
        }

          const context: Context = {
            req,
            user: currentUser,
            ip,
            location: geoip.lookup(ip),
            md: new MobileDetect(req.headers['user-agent']),
          };
          return {context};
      },
    });

    await server.start();
    console.log("server started");
    server.applyMiddleware({ app, path: graphQlPath });
    console.log("middleware applied");
    await new Promise(resolve => httpServer.listen({ port }));
    
    console.log(`Server started at http://localhost:${port}/${graphQlPath}`)
    return { server, app}
  
  }

  // http://localhost:4000/graphql
  startApolloServer();