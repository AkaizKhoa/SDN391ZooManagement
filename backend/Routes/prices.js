// The http Requests For The Create, Retrieve, Update And Delete Operations Are Coded!

//Import Express

const express = require('express');

//Import The Created User Model

const Prices = require('../models/price');

//Invoke express.Router() To Send Requests To routes And Write http Requests

const router = express.Router();

//Save Prices

router.post('/price/save',(req,res)=>{

//Instantiate Prices Via A Constructor

let newPrice = new Prices(req.body);

newPrice.save((err)=>{
    if(err){
        return res.status(400).json({
            error:err
        });
    }
        return res.status(200).json({
            success:"Prices Saved Successfully!"
        });
});

});

//Get Prices

router.get('/price',(req,res)=>{
    Prices.find().exec((err,prices)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPrices:prices
        });
    });
});






module.exports = router;