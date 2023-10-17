import Tracking from "../models/trackingModel.js";
import mongoose from "mongoose";

//get all tracking info
const getTracking = async (req, res) => {
  const tracking = await Tracking.find({}).sort({ createdAt: -1 });

  res.status(200).json(tracking);
  console.log(tracking, "tracking");
};

//get a tracking info
const getSingleTracking = async (req, res) => {
  const { tn } = req.params;

  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(404).json({ error: "No such tracking info" });
  // }

  const tracking = await Tracking.findOne({ tn: tn });

  if (!tracking) {
    return res.status(404).json({ error: "No such tracking info" });
  }

  res.status(200).json(tracking);
};

//create all tracking info
const createTracking = async (req, res) => {
  const { name, address, tn } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }
  if (!address) {
    emptyFields.push("address");
  }
  if (!tn) {
    emptyFields.push("tracking number");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }
  try {
    const tracking = await Tracking.create({ name, address, tn });
    res.status(200).json(tracking);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

//delete all tracking info
const deleteTracking = async (req, res) => {
  const { id } = req.params;

  console.log(`Received DELETE request for ID: ${id}`);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log(`Invalid ID: ${id}`);
    return res.status(404).json({ error: "No such tracking info" });
  }

  try {
    const tracking = await Tracking.findOneAndDelete({ _id: id });

    if (!tracking) {
      console.log(`No tracking found for ID: ${id}`);
      return res.status(404).json({ error: "No such tracking info" });
    }

    console.log(`Deleted tracking with ID: ${id}`);
    res.status(200).json(tracking);
  } catch (error) {
    console.error(`Error deleting tracking: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};


//update all tracking info
const updateTracking = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such tracking info" });
  }

  const tracking = await Tracking.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (!tracking) {
    return res.status(404).json({ error: "No such tracking info" });
  }

  res.status(200).json(tracking);
};

export {
  createTracking,
  getTracking,
  getSingleTracking,
  deleteTracking,
  updateTracking,
};
