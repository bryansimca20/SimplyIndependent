const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * User Schema
 */
const caregiverSchema = new Schema({
    airtableID: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    location: {
        type: String,
        required: true,
    },
    certifications: {
        type: Array,
        required: true,
        default: [],
    },
    experience: {
        type: String,
        required: true,
        default: "0"
    },
    availability: {
        type: Array,
        required: true,
        default: [],
    }
})

const Caregiver = mongoose.model("Caregiver", caregiverSchema)
module.exports = Caregiver