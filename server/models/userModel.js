/* Schema for the Item document */

const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
        username: {
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
            type: Array,
            default: []
        },
        cart: {
            type: Array,
            default: []
        },
        wishlist: {
            type: Array,
            default: []
        },
        role:{
            type:String,
            enum: ['admin','user'],
            default: 'user'
        },
        sign:{
            type:String,
        },
        adress:{
            type:String,
            require: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("User", userSchema)