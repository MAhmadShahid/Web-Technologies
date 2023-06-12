let mongoose = require('mongoose');

let bookingModel = mongoose.Schema({
    type: String,
    driverName: String,
    vehicle: String,
});

module.exports = mongoose.model("BookingModel", bookingModel); 