// The http Requests For The Create, Retrieve, Update And Delete Operations Are Coded!

//Import Express

const express = require("express");

//Import The Created User Model

const Category = require("../models/Category");

//Invoke express.Router() To Send Requests To routes And Write http Requests

const router = express.Router();

//Save Cages

router.post("/category/save", (req, res) => {
  //Instantiate Cages Via A Constructor

  let newCategory = new Category(req.body);

  newCategory.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Category Saved Successfully!",
    });
  });
});

//Get Cages

router.get("/category", (req, res) => {
  Category.find().exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingCategory: category,
    });
  });
});

//Export

module.exports = router;
