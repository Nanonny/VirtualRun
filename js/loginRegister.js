const express = require('express');
const mongoose = require('mongoose');
const app = express();

const port = 3000;


// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://first:00112299@cluster0.vlnod4z.mongodb.net/account', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema for your data
const userSchema = new mongoose.Schema({
  Name: String,
  Age: Number,
  sex: String,
  email: String,
  psw: String,
  Address: String,
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema,'allUser');

// Parse JSON in request body

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// Handle form submission
app.post('/submit-form', async (req, res) => {
  try {
    console.log('Received data:', req.body);
    
    const newUser = new User({
      Name: req.body.Name,
      Age: req.body.Age,
      sex: req.body.sex,
      email: req.body.email,
      psw: req.body.psw,
      Address: req.body.Address,
    });

    await newUser.save();


    console.log('User saved successfully!');
    res.redirect('http://127.0.0.1:5501/html/login.html');
  } catch (error) {
    console.error('Error:', error);
    //res.status(500).send('Internal Server Error');
  }
});


app.post('/login', (req, res) => {
  const { email, psw } = req.body;
  
  // Find the user in the database
  User.findOne({ email: email, psw: psw })
    .then(user => {
      if (!user) {
        res.status(401).send('Invalid credentials');
      } else {
        res.redirect('http://127.0.0.1:5501/html/tets.html');  
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('An error occurred');
    });
});

const dataSchema = new mongoose.Schema({
  fname: String,
  email: String,
  phone: String,
  gender: String,
  address: String,
  nationality: String,
  size: String,
  selectedProducts: Array,
  totalprice: Number,
});

const DataModel = mongoose.model('Data', dataSchema);

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/saveData', async (req, res) => {
  try {
    const formData = req.body;
    const total = (formData.imageSelector || []).reduce((a, b) => a + Number(b), 0);

    const newData = new DataModel({
      fname: formData.fname,
      email: formData.email,
      phone: formData.phone,
      gender: formData.gender,
      address: formData.address,
      nationality: formData.nationality,
      size: formData.size,
      selectedProducts: formData.imageSelector || [],
      totalprice: total,
    });

    await newData.save();
    

    //res.status(200).send('Data saved successfully');
  } catch (error) {
    console.error('Error:', error);
    //res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
