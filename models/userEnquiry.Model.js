const mongoose = require('mongoose');

// Define the schema for your collection
const UserEnquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
}, { timestamp: true });

// Create a model using the schema
const User = mongoose.model('UserEnquiry', UserEnquirySchema);

module.exports = User;
