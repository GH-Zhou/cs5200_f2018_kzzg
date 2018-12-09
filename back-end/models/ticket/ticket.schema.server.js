const mongoose = require('mongoose');

let ticketSchema = mongoose.Schema({

    reservation: {type: mongoose.Schema.ObjectId, ref: "ReservationModel"},
    flight:{type: mongoose.Schema.ObjectId, ref: "FlightModel"}

}, {collection: "tickets"});

module.exports = ticketSchema;