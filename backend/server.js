import express from 'express';
import typeDefs from './schema.js';
import resolvers from './resolvers.js';
import pkg from 'apollo-server-express';
import mongoose from 'mongoose';
import cors from 'cors';

const { ApolloServer } = pkg;


// const { graphqlExpress,graphiqlExpress } = pkg1;

const app = express();

app.use(cors());

mongoose.connect('mongodb://localhost/graphqlserver');

const connection = mongoose.connection;

connection.once('open',()=> {
  console.log('mongoDb database connection established successfully');
} )

// app.use('/graphiql', graphiqlExpress({
//   endpointURL: '/graphql'
// }));

// app.use('/graphql', graphqlExpress({shema}))

const server = new ApolloServer({typeDefs, resolvers});
server.applyMiddleware({app, path: '/graphiql'});
server.applyMiddleware({app, path: '/graphql'})

app.listen(4000, () => console.log('server running on port 4000'))