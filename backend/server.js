const express = require('express');
const multer = require('multer');
const path = require('path');
const mime = require('mime-types');
const cors = require('cors'); // Import CORS middleware
const { stat } = require('fs');

const app = express();
const port = 5000; // Use a different port for the backend

// CORS middleware to allow requests from localhost:3000 (your React frontend)
app.use(cors({ origin: 'http://localhost:3000' }));

// Configure multer to use a specific directory for storing uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Uploads will be stored in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name for storing the file
  }
});

// Create multer instance with specified storage options
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Check if the uploaded file is a valid xls file
    if (mime.extension(file.mimetype) === 'xls') {
      cb(null, true);
    } else {
      cb
      (new Error('Only .xls files are allowed!'), false);
    }
  }
});

// Serve the uploads directory statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Handle file upload POST request
app.post('/upload', upload.single('file'), (req, res) => {
  // 'file' should match the name attribute in your frontend form
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  res.status(200).send('File uploaded successfully.');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
