const mongoose = require("mongoose");


const itemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  categery: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
}, {
  timestamp: true
})



module.exports = mongoose.model("Item", itemSchema)