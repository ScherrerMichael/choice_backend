const express = require('express');
const router = express.Router();
const mongoose =require('mongoose');

const Food = require('../models/foodItem');

router.post('/', (req, res, next) => {
    const food = new Food({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        catagory: req.body.catagory,
    })
    
    food.save()
        .then( result => {
            console.log(result);
        })
        .catch(err => console.log(err));
            res.status(201).json({
                createdFoodItem: food
            })
        });

router.get("/", (req, res, next) => {
    Food.find()
    .exec()
    .then(docs => {
        console.log(docs);
        if (docs.length > 0){
        res.status(200).json(docs);
        } else {
            res.status(404).json({
                message: 'No items found'
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

router.delete("/:foodId", (req, res, next) => {
    const id = req.params.foodId;
    Food.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

router.patch("/:foodId", (req, res, next) => {
    const id = req.params.foodId;
    const updateOps ={};

    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    Food.updateOne({_id: id}, {$set: updateOps})
    .exec()
    .then( result => {
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
})

module.exports = router;