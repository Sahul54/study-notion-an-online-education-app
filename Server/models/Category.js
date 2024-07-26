const mongoose = require("mongoose");
// define the Tags schema
const CategorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        // trim: true,
    },
    course:[
            {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Course",
        }
    ],
})

// Export the Tags model
module.exports = mongoose.model("Category", CategorySchema);