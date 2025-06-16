let tasks = [];
let nextId = 1;

const getAllTasks = () => tasks;

const getTaskById = (id) => tasks.find(task => task.id === id);

const createTask = (taskData) => {
  const newTask = {
    id: (nextId++).toString(),
    title: taskData.title,
    description: taskData.description || '',
    completed: false
  };
  tasks.push(newTask);
  return newTask;
};

const updateTask = (id, updates) => {
  const task = tasks.find(task => task.id === id);
  if (task) {
    if (updates.title) task.title = updates.title;
    if (updates.description !== undefined) task.description = updates.description;
    if (updates.completed !== undefined) task.completed = updates.completed;
    return task;
  }
  return null;
};

const deleteTask = (id) => {
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    return true;
  }
  return false;
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};