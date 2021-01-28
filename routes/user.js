const express = require("express");
const userRouter = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const passportCOnfig = require('../passport');
const User = require('../models/usersModel');
const Item = require('../models/itemsModel');
const JWT = require('jsonwebtoken');

userRouter.post('/register', (req, res) =>{
    const {userName, password, email, firstName, lastName} = req.body;

    User.findOne({userName}, (err, user)=>{
        if (err)
            res.status(500).json({message: {msgBody: "Error has occured", msgError: true}})
        if (user)
            res.status(400).json({message: {msgBody: "Username is already taken", msgError: true}})
        else{
            const newUser = new User({
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                email: email, 
                password: password,
                isAdmin: false,
                items: []
            });
            
            newUser.save(err => {
                if (err)
                    res.status(500).json({message: {msgBody: "Error has occured", msgError: true}})
                else 
                    res.status(201).json({message: {msgBody: "Account succesfully created", msgError: false}})

            })  
        }
    });
});

module.exports = userRouter;



