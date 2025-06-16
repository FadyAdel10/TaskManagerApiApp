const express = require('express');
require('dotenv').config();
const taskRoutes = require('./src/routes/tasks');

const app = express();
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('Task Manager API'));
app.use('/', taskRoutes);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));