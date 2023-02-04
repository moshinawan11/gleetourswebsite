const mongoose = require("mongoose");

const toursSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    days: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true
    },
    image: {
        path: {
            type: String,
            required: true
        },
        filename: {
            type: String,
            required: true
        }
    },
    touristAttractions: String,
    dayDetails: [String],
    packageInclusion: String,
    packageExclusion: String,
})

const Tour = mongoose.model("Tour", toursSchema)

module.exports = Tour;