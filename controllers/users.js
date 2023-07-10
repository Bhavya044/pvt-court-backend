const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const app = express();


//Getting all users
const getAllUsers = async (req, res) => {
  try {
    const data = await User.find()
   res.status(200).json({ message: 'User data fetched successfully', users: data,statusCode:0 });
    
  } catch (error) {
     console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}

//Creating new user
const CreateUser = async (req, res) => {
  try {
  
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ error: 'User with this email already exists',statusCode:-1 });
    }

    //Encrypting password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating a new user object
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Saving the user to the database
    const data = await newUser.save();

   
    res.status(200).json({ message: 'User registered successfully', user: data,statusCode:0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};


//Logging in
const loginUser = async (req, res) => {
  try {

    const { username, password } = req.body;

    // Finding the user by username
    const user = await User.findOne({ username });
    //I user doesn't exists
    if (!user) {
      return res.status(200).json({ error: 'Invalid email or password', statusCode: -1 });
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(200).json({ error: 'Invalid email or password', statusCode: -1 });
    }

    // If Password is valid, return success response
    res.status(200).json({ message: 'Login successful', user, statusCode: 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = {
  getAllUsers,
  CreateUser,
  loginUser
};
