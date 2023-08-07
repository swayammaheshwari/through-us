import { Schema, model, models } from 'mongoose';

const blogSchema = new Schema({
  author: {
    type: String,
    unique: [true, 'author already exists!'],
    required: [true, 'Email is required!'],
  },
  title: {
    type: String,
  },
  blog_body: {
    type: String,
  },
  date: {
    type: String,
  },
  image: {
    type: Number,
  },
});

const Blog = models.Blog || model("Blog", blogSchema);

export default Blog;