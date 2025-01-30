const mongoose = require("mongoose");

const PlacementcoordinatorSchema = new mongoose.Schema({
  fullname: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  otp: {
    type: String,
  },
  password: {
    type: String,
  },
  mailSended: {
    type: Boolean,
    default: false,
  },
});

const Placementcoordinator = mongoose.model(
  "Placementcoordinator",
  PlacementcoordinatorSchema
);

module.exports = Placementcoordinator;
