import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// In-memory task list (array)
let tasks = [];

// Routes
app.get("/", (req, res) => {
  res.render("index", { tasks, error: null });
});

app.post("/add", (req, res) => {
  const { task, priority } = req.body;

  if (!task.trim()) {
    return res.render("index", { tasks, error: "Task cannot be empty" });
  }

  tasks.push({ id: Date.now(), name: task, priority });
  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  const id = Number(req.params.id);
  tasks = tasks.filter((task) => task.id !== id);
  res.redirect("/");
});

app.post("/edit/:id", (req, res) => {
  const id = Number(req.params.id);
  const { task, priority } = req.body;

  tasks = tasks.map((t) =>
    t.id === id ? { ...t, name: task, priority } : t
  );

  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
