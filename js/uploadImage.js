const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');

const app = express();
const port = 3002;

// Connect to MongoDB Atlas (replace YOUR_CONNECTION_STRING with your actual connection string)
mongoose.connect('mongodb+srv://first:00112299@cluster0.vlnod4z.mongodb.net/upload_payment', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a mongoose model for your images
const Image = mongoose.model('Image', { filename: String });

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Serve your HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/html/upload.html');
});

// Handle file uploads
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // Create a new document in MongoDB with the image data
    const newImage = new Image({ filename: req.file.originalname });
    await newImage.save();

    //res.send('Image uploaded successfully!');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
