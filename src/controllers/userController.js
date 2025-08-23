const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');

exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    const id = uuidv4();
    const user = await User.create({ id, name, email });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getHello = (req, res) => {
  res.json({ message: 'Hello from API v1!' });
};