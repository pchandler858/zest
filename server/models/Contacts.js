const { Schema, model, mongoose } = require("mongoose");

const contactsSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    companyName: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        match: [/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/, "Must be a valid phone number!"],
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
});

const Contacts = mongoose.model("Contacts", contactsSchema);

module.exports = Contacts;