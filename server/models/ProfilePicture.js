const { Schema } = require("mongoose");

const profilePictureSchema = new Schema({
  pictureUrl: {
    type: String,
  },
});

module.exports = profilePictureSchema;
