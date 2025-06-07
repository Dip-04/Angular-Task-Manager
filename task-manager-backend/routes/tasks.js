const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');

// ✅ GET: All tasks of the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error while fetching tasks.' });
  }
});

// ✅ POST: Create a new task
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;

    const newTask = new Task({
      title,
      description,
      dueDate,
      priority,
      user: req.user._id,
    });

    const task = await newTask.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: 'Invalid task data.' });
  }
});

// ✅ PUT: Update an existing task
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description, dueDate, priority, completed } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, description, dueDate, priority, completed },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json(task);
  } catch (err) {
    res.status(400).json({ message: 'Error updating task.' });
  }
});

// ✅ DELETE: Delete a task
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting task.' });
  }
});

module.exports = router;
