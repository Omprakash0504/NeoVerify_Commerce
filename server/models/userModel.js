/* Schema for the Item document */

const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        orders: {
            type: Array[String]
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("User", userSchema)