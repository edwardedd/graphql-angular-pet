import mongoose from 'mongoose';
import courseModel from './models/course.js';

var courseData = [
  {
    id: '1',
    title: 'developer course 1',
    author: 'Rick Sanchez',
    description: 'Incrementally adoptable, so that you can drop it into an existing JavaScript app and start using GraphQL for just part of your UI.',
    topic: 'Node',
    url: 'https://apollo-angular.com/docs/',
    voteCount: 0
  },
  {
    id: '2',
    title: 'developer course 2',
    author: 'Mortie Sanchez',
    description: 'Inspectable and understandable, so that you can have great developer tools to understand exactly what is happening in your app.',
    topic: 'React',
    url: 'https://apollo-angular.com/docs/',
    voteCount: 0
  },
  {
    id: '3',
    title: 'developer course 3',
    author: 'Mister Bird',
    description: 'Universally compatible, so that Apollo works with any build setup, any GraphQL server, and any GraphQL schema.',
    topic: 'AnbgularJS',
    url: 'https://apollo-angular.com/docs/',
    voteCount: 0
  },
];

const resolvers = {
  Query: {
    allCourses: (root, {searchTerm}) => {
      // return courseData;
      if(searchTerm !=='')
        return courseModel.find({$text: {$search: searchTerm}}).sort({
          voteCount: 'desc'
        })
      else
      return courseModel.find().sort({
        voteCount: 'desc'
      });
    },
    course: (root, {id}) => {
      // return courseData.filter(course => {
      //   return course.id ===id;
      // })[0];
      return courseModel.findOne({id: id});
    }
  },
  Mutation: {
    upvote: (root, {id}) => {
      // const course = courseData.filter(course => {
      //   return course.id === id;
      // })[0];
      // course.voteCount++;
      // return course
      return courseModel.findOneAndUpdate({id: id}, {$inc: {"voteCount": 1}}, {returnNewDocument: true});
    },
    downvote: (root, {id}) => {
      // const course = courseData.filter(course => {
      //   return course.id === id;
      // })[0];
      // course.voteCount--;
      // return course
      return courseModel.findOneAndUpdate({id: id}, {$inc: {"voteCount": -1}}, {returnNewDocument: true});
    },
    addCourse: (root,{title,author,description,topic,url}) => {
      const course = new courseModel({title: title, author: author, description:description, topic:topic, url: url});
      return course.save();
    }
  }
}

export default resolvers;