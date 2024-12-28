// Created 12/24/2024
// Contains the fields for users in DB

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Entry fields for DB
const userFields = new Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    interests: { type: [String], required: false },
    location: { type: String, required: true }
});

module.exports = mongoose.model('User', userFields);