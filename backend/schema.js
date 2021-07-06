
import resolvers from "./resolvers.js";
import pkg from 'graphql-tools';
import pkeee from 'apollo-server-express';
const { gql } = pkeee;
const { makeExecutableSchema } = pkg;

const typeDefs = gql`
  type Course {
     id: String
     title: String
     author: String
     description: String
     topic: String
     url: String
     voteCount: Int
  }
  type Query {
    allCourses(searchTerm: String): [Course]
    course(id: String!): Course
  }
  type Mutation {
    addCourse(title: String!, author:String!, description:String, topic:String!, url:String): Course
    upvote(id: String!): Course
    downvote(id: String!): Course
  }
`;


const shema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default typeDefs;