// Import necessary modules
const mongoose = require('mongoose');

// Define the Ticket schema
const ticketSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now, // Set the default value to the current date and time
  },
  time: {
    type: String,
    required: true,
    default: new Date().toLocaleTimeString(), // Set the default value to the current time
  },
  ticketID: {
    type: String,
    required: true,
    unique: true, // Ensure that ticket IDs are unique
  },
});

// Create a Ticket model based on the schema
const Ticket = mongoose.model('Tickets', ticketSchema);

// Export the Ticket model for use in other parts of your application
module.exports = Ticket;


