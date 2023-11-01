// The http Requests For The Create, Retrieve, Update And Delete Operations Are Coded!

//Import Express

const express = require("express");

//Import The Created User Model

const Animals = require("../models/animal");
//Invoke express.Router() To Send Requests To routes And Write http Requests

const Cages = require("../models/Cage");

const router = express.Router();

//Save Animals

router.post("/animal/save", (req, res) => {
  //Instantiate Animals Via A Constructor

  let newAnimal = new Animals(req.body);

  let cageId = req.body.cage;
  Cages.findByIdAndUpdate(
    cageId,
    { $set: { isEmpty: true } }, // Đặt lại isEmpty thành true
    (err, cage) => {
      if (err) {
        return res.status(400).json({ error: err });
      } else {
        // Sau khi cập nhật isEmpty thành true, bạn có thể thêm newAnimal
        newAnimal.save((err) => {
          if (err) {
            return res.status(400).json({ error: err });
          } else {
            return res.status(200).json({
              success: "Updated isEmpty and Create new Animal Successfully!",
            });
          }
        });
      }
    }
  );
});

//Get A Specific Post

router.get("/animal/:id", (req, res) => {
  let postId = req.params.id;
  Animals.findById(postId, (err, post) => {
    if (err) {
      return res.status(400).json({
        success: false,
        err,
      });
    }
    return res.status(200).json({
      success: true,
      post,
    });
  });
});

//Get Animals

router.get("/animal", (req, res) => {
  Animals.find().exec((err, animals) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingAnimals: animals,
    });
  });
});

//Update Animals

router.put("/animal/update/:id", (req, res) => {
  Animals.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, post) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({
        success: "Updated Successfully!",
      });
    }
  );
});

//Delete Animals

router.delete("/animal/delete/:id", (req, res) => {
  Animals.findByIdAndRemove(req.params.id).exec((err, deletedPost) => {
    if (err)
      return res.status(400).json({
        message: "Delete Unsuccesfull!",
        err,
      });
    return res.json({
      message: "Deleted Successfully!",
      deletedPost,
    });
  });
});

// get detail animal in the cage

router.get("/animal/cage/:id", (req, res) => {
  let cageId = req.params.id;
  Animals.find({ cage: cageId }, (err, animal) => {
    if (err) {
      res.status(500).json({
        message: "Error finding animal",
      });
    } else if (animal.length === 0) {
      res.status(404).json({
        message: "No animal found for this user",
      });
    } else {
      res.status(200).json({
        message: "Success",
        animal: animal,
      });
    }
  });
});

//Export

module.exports = router;
