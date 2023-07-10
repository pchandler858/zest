const { Schema, model } = require("mongoose");

const calendarSchema = new Schema({
  todo: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Calendar = model("Calendar", calendarSchema);

module.exports = Calendar;
