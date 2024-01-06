const User = require("../models/userModel")

/* GET request handler */
const getUser = async (req,res) => {
    const user = await User.find(req.body.email)
    if(user.password===req.body.password){
        res.json(user)
    }
    res.json(user)
}

/* POST Request handler */
const createUser = async (req, res) => {
    /* The request.body must have all these values */
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        orders: []
    }

    if(user){
        await User.create(user)
        res.status(201).json({message: "User Created"})
        res.redirect("/shop")
    } 
    else {
        res.status(400).json({message: "Some Error Occurred"})
    }
}

/* Creating Order */
const order = async (req, res) => {
    const user = await User.find(req.body.email)
    
    res.json(user)
}

/* DELETE Request handler */
const deleteUser = (req, res) => {
    res.json({message: "delete Item"})
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser
}