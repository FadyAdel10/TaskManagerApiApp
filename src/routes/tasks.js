const express = require('express');
const router = express.Router();
const { getAllTasks, getTaskById, createTask, updateTask, deleteTask } = require('../data/tasks');

// HTML: Display all tasks
router.get('/tasks', (req, res) => {
  const tasks = getAllTasks();
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Task Manager</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f0f0f0;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    h1 {
      text-align: center;
      color: #333;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      padding: 10px;
      border-bottom: 1px solid #eee;
      display: flex;
      align-items: center;
    }
    .completed {
      text-decoration: line-through;
      color: #888;
    }
    .checkbox {
      margin-right: 10px;
    }
    .description {
      color: #666;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Task Manager</h1>
    <ul>
      ${tasks.length === 0 ? '<li>No tasks available</li>' : tasks.map(task => `
        <li>
          <span class="checkbox">${task.completed ? '☑' : '☐'}</span>
          <div>
            <span class="${task.completed ? 'completed' : ''}">${task.title}</span>
            ${task.description ? `<div class="description">${task.description}</div>` : ''}
          </div>
        </li>
      `).join('')}
    </ul>
  </div>
</body>
</html>`;
  res.send(html);
});

// JSON: Get all tasks
router.get('/api/tasks', (req, res) => {
  res.json(getAllTasks());
});

// JSON: Create a task
router.post('/api/tasks', (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }
  const newTask = createTask({ title, description });
  res.status(201).json(newTask);
});

// JSON: Get a task by ID
router.get('/api/tasks/:id', (req, res) => {
  const task = getTaskById(req.params.id);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// JSON: Update a task
router.patch('/api/tasks/:id', (req, res) => {
  const updates = req.body;
  const updatedTask = updateTask(req.params.id, updates);
  if (updatedTask) {
    res.json(updatedTask);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// JSON: Delete a task
router.delete('/api/tasks/:id', (req, res) => {
  const deleted = deleteTask(req.params.id);
  if (deleted) {
    res.json({ message: 'Task deleted' });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

module.exports = router;