import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// blog array
var blogPost = [
  {
    title: "First Blog Post",
    content:
      "Blog content Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita repellat, non, perferendis ullam facilis tempore quaerat ratione excepturi reiciendis sunt in eaque odit laudantium? Quisquam at unde ex animi corporis.",
  },
  {
    title: "Second Blog Post",
    content:
      "I'm getting used to this! Hope I can finish web development course!",
  },
];

// main get function
app.get("/", (req, res) => {
  res.render("index.ejs", { blogPost: blogPost });
});

// add new entry
app.post("/new_entry", (req, res) => {
  blogPost.push({ title: req.body.title, content: req.body.blog_content });
  res.redirect("/");
});

// edit post
app.post("/edit_blog/:id", (req, res) => {
  var index = req.params.id;
  res.render("edit.ejs", {
    blogPost: blogPost[index],
    index: index,
  });
});

app.post("/edit_blog/edit_successful/:id", (req, res) => {
  var index = req.params.id;
  blogPost[index].title = req.body.title;
  blogPost[index].content = req.body.content;
  res.redirect("/");
});

// delete post
app.post("/delete_blog/:id", (req, res) => {
  var index = req.params.id;
  blogPost.splice(index, 1);
  res.redirect("/");
});

// listen to port server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
