import mongoose  from "mongoose";
import {v1 as uuid} from "uuid";

const Schema = mongoose.Schema;

const courseShema = new Schema({
  id: {type: String, default: uuid},
  title: String,
  author: String,
  description: String,
  topic: String,
  url: String,
  voteCount: {type: Number, default: 0}
});

courseShema.index({' $**': 'text'});

const model = mongoose.model('course', courseShema);

export default model;