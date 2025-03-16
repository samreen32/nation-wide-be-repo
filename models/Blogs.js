const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema({
  nation_blogs: {
    blogTitle: { type: String },
    blogDesc: { type: String },
    blogImage: { type: String },
    blogTag: { type: String },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Blogs = mongoose.model("nationBlogs", blogSchema);
module.exports = Blogs;
