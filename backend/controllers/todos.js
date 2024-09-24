const todosRouter = require("express").Router();
const Todo = require("../models/todo");

todosRouter.get("/", async (request, response) => {
  const todos = await Todo.find({}).populate("category", { name: 1 });

  response.json(todos);
});

todosRouter.get("/:id", async (request, response) => {
  const todo = await Todo.findById(request.params.id).populate("category", {
    name: 1,
  });

  response.json(todo);
});

todosRouter.post("/", async (request, response) => {
  const body = request.body;

  const todo = new Todo({
    content: body.content,
    category: body.category,
    status: body.status,
  });

  const savedTodo = await todo.save();

  const populatedTodo = await savedTodo.populate("category", { name: 1 });

  response.status(201).json(populatedTodo);
});

todosRouter.delete("/:id", async (request, response) => {
  const todo = Todo.findById(request.params.id);

  await Todo.deleteOne(todo);

  response.status(204).end();
});

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
