const mongoose = require("mongoose");

const PlacementCoordinatorSchema = new mongoose.Schema({
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

const PlacementCoordinator = mongoose.models.PlacementCoordinator || mongoose.model("PlacementCoordinator", PlacementCoordinatorSchema);
module.exports = PlacementCoordinator;
