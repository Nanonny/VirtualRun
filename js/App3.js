const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();
const port = 3001;

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://first:00112299@cluster0.vlnod4z.mongodb.net/event_apply', { useNewUrlParser: true, useUnifiedTopology: true });

// Use bodyParser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json())

// Define a Mongoose schema
const userSchema = new mongoose.Schema({
  fname: String,
  email: String,
  phone: String,
  gender: String,
  address: String,
  nationality: String,
  size: String,
  imageSelector: Array,
  events: String,
  finalTotal: Number,
});

const User = mongoose.model('User', userSchema, 'detail');

// Handle form submissions
app.post('/submit', async (req, res) => {
  const userData = req.body;

  try {
    const newUser = new User({
      fname: userData.fname,
      email: userData.email,
      phone: userData.phone,
      gender: userData.gender,
      address: userData.address,
      nationality: userData.nationality,
      size: userData.size,
      imageSelector: userData.imageSelector || [],
      events: userData.events,
      finalTotal: userData.finalTotal,
    });

    await newUser.save();
    //res.send('Data saved to MongoDB');
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving to MongoDB');
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
