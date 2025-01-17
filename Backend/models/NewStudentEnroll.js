const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newStudentEnrollSchema = new Schema(
  {
    operationName: {
      type: String,
    },
    operationId: {
      type: String,
    },
    fullname: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
    phone: {
      type: String,
    },
    program: {
      type: String,
    },
    counselor: {
      type: String,
    },
    domain: {
      type: String,
    },
    domainId:{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'domain'
    },
    programPrice: {
      type: Number,
    },
    paidAmount: {
      type: Number,
    },
    monthOpted: {
      type: String,
    },
    clearPaymentMonth: {
      type: String,
    },
    remark: [{ type: String }],
    status: {
      type: String,
      default: "booked",
      },
      mailSended: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
  
);

const NewEnroll = mongoose.model("NewEnroll", newStudentEnrollSchema);
module.exports = NewEnroll;
