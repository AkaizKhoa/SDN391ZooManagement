const express = require("express");
const { response } = require("express");
let Medical = require("../models/medical");
const User = require("../models/User");
const Animal = require("../models/animal");

const router = express.Router();

//Save medical details

router.post("/medical/add", (req, res) => {
  let newMedical = new Medical(req.body);

  newMedical.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Medical saved successfully ",
    });
  });
});

//get medical details all

router.get("/medical", (req, res) => {
  Medical.find().exec((err, medical) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingMedical: medical,
    });
  });
});

// get medical by trainer
router.get("/trainer/medical/:id", async (req, res) => {
  const userid = req.params.id;
  try {
    const medical = await Medical.find({ user: userid })
      .populate("animal", "Animal_Name")
      .populate("user", "name")
      .exec();
    return res.status(200).json({
      success: true,
      existingMedical: medical,
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
});
//Update Medical Details

router.put("/medical/update/:id", (req, res) => {
  Medical.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, medical) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({
        success: "Success Update",
      });
    }
  );
});

//Delete Medical Details

router.delete("/medical/delete/:id", (req, res) => {
  Medical.findByIdAndRemove(req.params.id).exec((err, deletedmedical) => {
    if (err)
      return res.status(400).json({
        message: "Unsuccessful delete",
        err,
      });

    return res.status(200).json({
      message: "Success delete",
      deletedmedical,
    });
  });
});

router.get("/medical/get/:id", async (req, res) => {
  let medicalId = req.params.id;
  try {
    const medical = await Medical.findById(medicalId)
      .populate("animal", "Animal_Name")
      .populate("user", "name")
      .exec();
    return res.status(200).json({
      success: true,
      existingMedical: medical,
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
});
module.exports = router;
