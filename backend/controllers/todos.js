const todosRouter = require("express").Router();
const Todo = require("../models/todo");
const middleware = require("../utils/middleware");

todosRouter.get("/", async (request, response) => {
  const todos = await Todo.find({})
    .populate("category", { name: 1 })
    .populate("user", { username: 1, id: 1 });

  response.json(todos);
});

todosRouter.get("/:id", async (request, response) => {
  const todo = await Todo.findById(request.params.id)
    .populate("category", { name: 1 })
    .populate("user", { username: 1 });

  response.json(todo);
});

todosRouter.get("/user/:userid", async (request, response) => {
  const todos = await Todo.find({ user: request.params.userid })
    .populate("category", { name: 1 })
    .populate("user", { username: 1, id: 1 });

  response.json(todos);
});

todosRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;

  const user = request.user;

  const todo = new Todo({
    content: body.content,
    category: body.category,
    status: body.status,
    user: user._id,
  });

  const savedTodo = await todo.save();

  const populatedTodo = await savedTodo.populate([
    { path: "category", select: "name" },
    { path: "user", select: "username id" },
  ]);

  // add the new todo to user object
  user.todos = user.todos.concat(populatedTodo._id);
  await user.save();

  response.status(201).json(populatedTodo);
});

todosRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user;

    const todo = Todo.findById(request.params.id);

    await Todo.deleteOne(todo);

    // delete todo from the user object
    user.todos = user.todos.filter((t) => t.toString() !== todo.id);

    await user.save();

    response.status(204).end();
  }
);

todosRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const updateProps = {
    status: body.status,
  };

  const updatedTodo = await Todo.findByIdAndUpdate(
    request.params.id,
    updateProps,
    { new: true }
  ).populate("category", { name: 1 });

  response.json(updatedTodo);
});

module.exports = todosRouter;
