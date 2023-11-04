// The http Requests For The Create, Retrieve, Update And Delete Operations Are Coded!

//Import Express

const express = require("express");

//Import The Created User Model

const Cages = require("../models/Cage");

//Invoke express.Router() To Send Requests To routes And Write http Requests

const router = express.Router();

//Save Cages

router.post("/cage/save", (req, res) => {
  //Instantiate Cages Via A Constructor

  let newCage = new Cages(req.body);

  newCage.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Cages Saved Successfully!",
    });
  });
});

//Get A Specific Cage

router.get("/cage/:id", (req, res) => {
  let cageId = req.params.id;
  console.log(cageId);
  Cages.findById(cageId, (err, cage) => {
    if (err) {
      return res.status(400).json({
        success: false,
        err,
      });
    }
    return res.status(200).json({
      success: true,
      cage,
    });
  });
});

//Get Cages

router.get("/cage", (req, res) => {
  Cages.find()
    .populate("area", "name")
    .exec((err, cages) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
        existingCages: cages,
      });
    });
});

//Update Cages

router.put("/cage/update/:id", (req, res) => {
  Cages.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, cage) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({
        success: "Updated Successfully!",
      });
    }
  );
});

//Delete Cages

router.delete("/cage/delete/:id", (req, res) => {
  Cages.findByIdAndRemove(req.params.id).exec((err, deletedCage) => {
    if (err)
      return res.status(400).json({
        message: "Delete Unsuccesfull!",
        err,
      });
    return res.json({
      message: "Deleted Successfully!",
      deletedCage,
    });
  });
});

// GET CAGE BY ZOO TRAINER

router.get("/cage/trainer/:id", (req, res) => {
  let userID = req.params.id;
  Cages.find({ user: userID }, (err, cages) => {
    if (err) {
      res.status(500).json({
        message: "Error finding cages",
      });
    } else if (cages.length === 0) {
      res.status(404).json({
        message: "No cages found for this user",
      });
    } else {
      res.status(200).json({
        message: "Success",
        cages: cages,
      });
    }
  });
});

//Export

module.exports = router;
