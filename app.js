import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import bodyParser from 'body-parser';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

// Import routes
import adminRoutes from './routes/admin.js';
import studentRoutes from './routes/student.js';

// Register routes
app.use('/admin', adminRoutes);
app.use('/student', studentRoutes);

// Home route
app.get('/', (req, res) => {
  res.render('index');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});