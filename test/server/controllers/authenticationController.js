import mongoose from "mongoose";

const getUser  = async (req, res) => {
  const { username, password } = req.body;

  if (username == process.env.USERNAME && password === process.env.PASSWORD) {
    res.json({ message: 'Login successful', username: username });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
}

export default getUser;
