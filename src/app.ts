import createError, { HttpError } from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import 'dotenv/config';
import methodOverride from 'method-override';
import Debug from 'debug';
const debug = Debug('week-9-node-task-sq011-poda-leslie-bund:server');
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import recipesRouter from './routes/recipes';
import { authorize } from './utils';



// ************************************** START APOLLO ***********************************
import typeDefs from './graphQlHelpers/typeDefs';
import resolvers from './graphQlHelpers/resolvers';
import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

const app = express();

async function startApolloServer() {
  const server_2 = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground({
            })
          ],
  });
  await server_2.start();
  
  server_2.applyMiddleware({ app, path: '/graph'});

  // ***************************************** END OF START *********************************
  
  
  // view engine setup
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'jade');
  
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(methodOverride('_method'));
  
  app.use('/', indexRouter);
  app.use('/users', usersRouter);
  
  // Insert validation middleware
  app.use(authorize);
  app.use('/recipes', recipesRouter);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function(err: HttpError, req: Request, res: Response, next: NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

// await new Promise<void>(resolve => server.listen(port, () => resolve())
  // app.listen({ port: 4000 }, resolve)
  // );
// debug(`🚀 Server ready at http://localhost:${port}${server_2.graphqlPath}`);

};

startApolloServer()


export default app;

