import express from "express";
import methodOverride from "method-override";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method")); // add this
app.set("view engine", "ejs");

// In-memory task list
let tasks = [];

// Routes
app.get("/", (req, res) => {
  res.render("index", { tasks, error: null });
});

// Add new task (POST remains the same)
app.post("/add", (req, res) => {
  const { task, priority } = req.body;
  if (!task.trim()) return res.render("index", { tasks, error: "Task cannot be empty" });
  tasks.push({ id: Date.now(), name: task, priority });
  res.redirect("/");
});

// Delete task (now DELETE)
app.delete("/delete/:id", (req, res) => {
  const id = Number(req.params.id);
  tasks = tasks.filter((task) => task.id !== id);
  res.redirect("/");
});

// Edit task (now PUT)
app.put("/edit/:id", (req, res) => {
  const id = Number(req.params.id);
  const { task, priority } = req.body;
  tasks = tasks.map((t) => (t.id === id ? { ...t, name: task, priority } : t));
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
