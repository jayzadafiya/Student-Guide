const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({

     name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});

const Contact = new mongoose.model('Contact', contactSchema);

module.exports = Contact;