const { Schema, model } = require("mongoose");

const contactsSchema = new Schema({
  firstName: {
    type: String,
    required: false,
    trim: true,
  },
  lastName: {
    type: String,
    required: false,
    trim: true,
  },
  companyName: {
    type: String,
    required: true,
    trim: true,
    sparse: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: [
      /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
      "Must be a valid phone number!",
    ],
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  address1: {
    type: String,
    required: false,
    trim: false,
  },
  address2: {
    type: String,
    required: false,
    trim: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = contactsSchema;
