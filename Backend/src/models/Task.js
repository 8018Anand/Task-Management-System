const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    status: {
      type: String,
      enum: ["Todo", "In Progress", "Done"],
      default: "Todo",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
    dueDate: Date,
  },
  { timestamps: true },
);

// Core indexes (Analytics & Default Dashboard)
taskSchema.index({user: 1});
taskSchema.index({user:1, status:1});
taskSchema.index({user:1, createdAt:-1});

// Feature indexes (Sorting by Due Date & Filtering/Sorting by Priority)
taskSchema.index({user: 1, dueDate: 1});
taskSchema.index({user: 1, priority: 1});

module.exports = mongoose.model("Task", taskSchema);
