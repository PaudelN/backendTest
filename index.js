const express = require("express");
const PORT = 8080;
require("./script");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Intuji Test is here</h1>");
});

//Database Connection
async function databaseConnection() {
  try {
    await mongoose.connect("mongodb://localhost:27017/intujiBackendTest");
    console.log("Connected to MongoDB Database");
  } catch (err) {
    console.log("Error connecting to database");
  }
}
databaseConnection();

//blogSchemas creation
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

//collection or model
const Blog = new mongoose.model("blogs", blogSchema);

//Post blog

app.post("/api/v1/blog/new", async (req, res) => {
  const blog = await Blog.create(req.body);
  res.status(201).json({
    success: true,
    blog,
  });
});

//Read(Get) all blogs
app.get("/api/v1/blogs", async (req, res) => {
  const blogs = await Blog.find();
  res.status(200).json({
    success: true,
    blogs,
  });
});

//Get blog by Id
app.get("/api/v1/blogs/:id", async (req, res) => {
  const blogs = await Blog.findById(req.params.id);
  res.status(200).json({
    success: true,
    blogs,
  });
});

//Update blog
app.put("/api/v1/blog/:id", async (req, res) => {
  let blog = await Blog.findById(req.params.id);

  blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false,
    runValidator: true,
  });

  res.status(200).json({
    success: true,
    blog,
  });
});

app.listen(PORT, () => {
  console.log(`Server is created in Port ${PORT}`);
});
