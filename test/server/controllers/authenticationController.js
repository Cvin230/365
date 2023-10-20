import mongoose from "mongoose";

const getUser  = async (req, res) => {
  const { username, password } = req.body;

  if (username.toLowerCase() === process.env.USERNAME.toLowerCase() && password === process.env.PASSWORD) {
    res.json({ message: 'Login successful', username: username });
  } else {
    res.status(401).json({ message: 'Wrong Username or Password' });
  }
}

export default getUser;
