import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// blog array
var blogPost = [
  {
    title: "First Blog Post",
    content:
      "Blog content Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    title: "Second Blog Post",
    content:
      "I'm getting used to this! Hope I can finish web development course!",
  },
];

// main get function
app.get("/", (req, res) => {
  try {
    res.render("index.ejs", { blogPost: blogPost });
  } catch (error) {
    console.error("Error rendering index:", error);
    res.status(500).send("Internal Server Error");
  }
});

// add new entry
app.post("/new_entry", (req, res) => {
  try {
    blogPost.push({ title: req.body.title, content: req.body.blog_content });
    res.redirect("/");
  } catch (error) {
    console.error("Error adding new entry:", error);
    res.status(500).send("Internal Server Error");
  }
});

// edit post
app.post("/edit_blog/:id", (req, res) => {
  try {
    var index = req.params.id;
    res.render("edit.ejs", {
      blogPost: blogPost[index],
      index: index,
    });
  } catch (error) {
    console.error("Error rendering edit page:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/edit_blog/edit_successful/:id", (req, res) => {
  try {
    var index = req.params.id;
    blogPost[index].title = req.body.title;
    blogPost[index].content = req.body.content;
    res.redirect("/");
  } catch (error) {
    console.error("Error editing blog post:", error);
    res.status(500).send("Internal Server Error");
  }
});

// delete post
app.post("/delete_blog/:id", (req, res) => {
  try {
    var index = req.params.id;
    blogPost.splice(index, 1);
    res.redirect("/");
  } catch (error) {
    console.error("Error deleting blog post:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// listen to port server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// For Vercel serverless deployment
export default app;
