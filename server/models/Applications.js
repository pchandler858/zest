const { Schema } = require("mongoose");

const applicationSchema = new Schema({
  companyName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  // We can use Date.parse here to save the user input as a date if needed, regex should work as well.
  appliedOn: {
    type: String,
    required: false,
    // Checks for dd/mm/yyyy, dd-mm-yyyy, dd.mm.yyyy. Seems to be a common format.
    match: [
      /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
      "Must be a date format! ie: 01/01/2022",
    ],
  },
  contactName: {
    type: String,
    required: true,
    trim: true,
  },
  position: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = applicationSchema;
