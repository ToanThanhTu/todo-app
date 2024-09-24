const categoriesRouter = require("express").Router();
const Category = require("../models/category");

categoriesRouter.get("/", async (request, response) => {
  const categories = await Category.find({}).populate("todos", {
    content: 1,
    status: 1,
  });

  response.json(categories);
});

categoriesRouter.get("/:id", async (request, response) => {
  const category = await Category.findById(request.params.id);
  // .populate(
  //   "todos",
  //   {
  //     content: 1,
  //     status: 1,
  //   }
  // );

  response.json(category);
});

categoriesRouter.post("/", async (request, response) => {
  const body = request.body;

  const category = new Category({
    name: body.name,
    todos: body.todos,
  });

  const savedCategory = await category.save();

  const populatedCategory = await savedCategory.populate("todos", {
    content: 1,
    status: 1,
  });

  response.status(201).json(populatedCategory);
});

categoriesRouter.delete("/:id", async (request, response) => {
  const category = Category.findById(request.params.id);

  await Category.deleteOne(category);

  response.status(204).end();
});

categoriesRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const updateProps = {
    todos: body.todos,
  };

  const updatedCategory = await Category.findByIdAndUpdate(
    request.params.id,
    updateProps,
    { new: true }
  ).populate("todos", { content: 1, status: 1 });

  response.json(updatedCategory);
});

module.exports = categoriesRouter;
