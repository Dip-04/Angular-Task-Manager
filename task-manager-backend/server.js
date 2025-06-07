const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Import routers
const authRouter = require('./routes/auth');
const tasksRouter = require('./routes/tasks');

// Mount routers with base paths
app.use('/api/auth', authRouter);
app.use('/api/', tasksRouter);

// Basic test route

app.get('/api/test', (req, res) => {
  res.json({ message: 'Test route works!' });
});

// Function to print registered routes on server start
function printRoutes(path, layer) {
  if (layer.route) {
    layer.route.stack.forEach(stack => {
      const method = stack.method.toUpperCase();
      const routePath = path + layer.route.path;
      console.log(`${method} ${routePath}`);
    });
  } else if (layer.name === 'router' && layer.handle.stack) {
    layer.handle.stack.forEach(l => {
      const prefix = layer.regexp.source
        .replace('^\\', '')
        .replace('\\/?(?=\\/|$)', '')
        .replace(/\\\//g, '/')
        .replace(/\$$/, '');
      printRoutes(path + prefix, l);
    });
  }
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  if (app._router && app._router.stack) {
    app._router.stack.forEach(layer => {
      printRoutes('', layer);
    });
  } else {
    console.log('No routes registered or app._router is undefined');
  }
});
