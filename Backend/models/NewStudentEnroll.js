const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newStudentEnrollSchema = new Schema(
  {
    operationName: {
      type: String,
      default:null
    },
    operationId: {
      type: String,
      default:null
    },
    fullname: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    alternativeEmail: {
      type: String,
    },
    phone: {
      type: String,
    },
    transactionId: {
      type: String,
      unique: true,
    },
    program: {
      type: String,
    },
    modeofpayment: {
      type: String,
    },
    counselor: {
      type: String,
    },
    domain: {
      type: String,
    },
    domainId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "domain",
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
    status: { type: String, default: "booked" },
    mailSended: { type: Boolean, default: false },
    onboardingSended: { type: Boolean, default: false },
    offerLetterSended: { type: Boolean, default: false },

    whatsAppNumber:{type:String},
    remainingAmount:{type:String},
    collegeName:{type:String},
    branch:{type:String},
    aadharNumber:{type:String},
    referFriend:{type:String},
  },
  {
    timestamps: true,
  },


);

const NewEnroll = mongoose.model("NewEnroll", newStudentEnrollSchema);
module.exports = NewEnroll;
