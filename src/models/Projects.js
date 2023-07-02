const { Schema, model, mongoose } = require("mongoose");
require('mongoose-type-url');

const projectsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    startDate: {
        type: Date,
        required: true,
        trim: true,
    },
    endDate: {
        type: Date,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        required: true,
        trim: true,
    },
    url: {
        type: String,
        required: true,
        unique: true,
        
    },
});

//this MIGHT work, not to sure yet.
projectsSchema.path('url').validate((val) => {
    const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return urlRegex.test(val);
}, 'Invalid URL.');

const Projects = mongoose.model("Projects", projectsSchema);

module.exports = Projects;