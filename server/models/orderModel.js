const mongoose = require("mongoose")

const orderSchema = mongoose.Schema(
    {
        user_id:{
            type:String,
            required:true,
        },
        product_id:{
            type: Array,
            require: true
        },
        quantity:{
            type:String,
            required:true,
        },
        totalPrice:{
            type:String,
            required:[true,"price must be given"]
        },
        address:{
            type: String,
            require:true
        },
        purchesehDate:{
            type:Date,
            default:Date.now(),
            require: true
        },
        delivery_date:{
            type:Date,
            require: true
        },
        status:{
            type: String,
            enum: ["pending","verified","outfordelivery","deliveried"],
            default: "pending"
        }
    },
    {
        timestamps: true
    })


module.exports = mongoose.model("Order", orderSchema)