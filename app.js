const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public")); // middleware

//^ Import del router dei post
const postsRouter = require("./routers/posts");

app.get("/", (req, res) => {
  res.send("Server homepage");
});

//^ le rotte dei post con il prefisso /posts
app.use("/posts", postsRouter);

app.listen(port, () => {
  console.log(`Server attivo su http://localhost:${port}`);
});
