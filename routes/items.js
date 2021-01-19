const express = require("express");
const router = express.Router();

const mongoose = require('mongoose');
const items = mongoose.model('Item')

router.get("/list", async (req, res) => {
    try {
        res.status(200).json({
            data: items
        });

    } catch (err){
        res.status(400).jsos({
            message: "Error occured when getting item",
            err
        });
    }
});


router.get("/:id", async (req, res) => {
    let { id } = req.params;
    id = Number(id);
    try{
        let item = items.find(item => item._id === id);
        res.status(200).json({
            data: item
        });
    }catch (err){
        res.status(400).json({
            message: "Error occured when finding item",
            err
        });
    }
});

module.exports = router;