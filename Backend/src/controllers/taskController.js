const Task = require("../models/Task");
const asyncHandler = require("../utils/asyncHandler");

// Create task
exports.createTask = asyncHandler(async (req, res) => {
  const task = await Task.create({
    ...req.body,
    user: req.user,
  });

  res.status(201).json(task);
});

// Get all tasks
exports.getTasks = asyncHandler(async (req, res) => {
  const { status, priority, search, page = 1, limit = 3, sortBy, sortOrder } = req.query;

  let query = { user: req.user };

  // filter by status
  if (status) {
    query.status = status;
  }

  // filter by priority
  if (priority) {
    query.priority = priority;
  }

  // search by title (case-insensitive)
  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  // Get total tasks for pagination
  const totalTasks = await Task.countDocuments(query);

  // Build sort options dynamically
  let sortOptions = { createdAt: -1 }; // Default: newest first
  if (sortBy) {
    sortOptions = {};
    sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;
  }

  const tasks = await Task.find(query)
    .sort(sortOptions)
    .skip(skip)
    .limit(limitNum);

  res.json({
    tasks,
    totalPages: Math.ceil(totalTasks / limitNum),
    currentPage: pageNum,
  });
});

// Update task
exports.updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: "after",
  });

  res.json(task);
});

// Delete task
exports.deleteTask = asyncHandler(async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

//Get analytics
exports.getAnalytics = asyncHandler(async (req, res) => {
  const userId = req.user;

  const total = await Task.countDocuments({ user: userId });
  const completed = await Task.countDocuments({
    user: userId,
    status: "Done",
  });

  const pending = total - completed;

  const completionRate =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  res.json({
    total,
    completed,
    pending,
    completionRate,
  });
});