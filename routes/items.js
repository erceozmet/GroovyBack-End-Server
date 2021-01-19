const express = require("express");
const router = express.Router();

const mongoose = require('mongoose');
const items = require("../models/itemsModel")

function success(res, payload) {
    return res.status(200).json(payload)
  }

router.get("/list", async (req, res) => {
    try {
        res.status(200).json({
            data: await items.find({})
        });

    } catch (err){  
        res.status(400).json({
            message: "Error occured when getting item",
            err
        });
    }
});
router.get("/", async (req, res, next) => {
    try {
      const todos = await items.find({})
      return success(res, todos)
    } catch (err) {
      next({ status: 400, message: "failed to get items" })
    }
})

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