const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getAnalytics,
} = require("../controllers/taskController");

router.use(auth);

router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.get("/analytics", getAnalytics);

module.exports = router;
