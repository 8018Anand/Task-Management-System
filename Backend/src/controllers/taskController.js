const Task = require("../models/Task");

// Create task
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.user,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });


    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get analytics
exports.getAnalytics = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};