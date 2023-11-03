// The http Requests For The Create, Retrieve, Update And Delete Operations Are Coded!

//Import Express

const express = require("express");

//Import The Created User Model

const Areas = require("../models/area");
const Animals = require("../models/animal");
const Cage = require("../models/Cage");

//Invoke express.Router() To Send Requests To routes And Write http Requests

const router = express.Router();

//Save Areas

router.post("/area/save", (req, res) => {
  //Instantiate Areas Via A Constructor

  let newArea = new Areas(req.body);

  newArea.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Areas Saved Successfully!",
    });
  });
});

//Get A Specific Post

// router.get("/area/:id",(req,res) => {
//     let postId  = req.params.id;
//     Areas.findById(postId,(err,post) => {
//         if(err){
//             return res.status(400).json({
//                 success:false,err
//             });
//         }
//         return res.status(200).json({
//             success:true,
//             post
//         });
//     });
// });

//Get Areas

router.get("/area", (req, res) => {
  Areas.find().exec((err, areas) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingAreas: areas,
    });
  });
});

//Update Areas

router.put("/area/update/:id", (req, res) => {
  Areas.findByIdAndUpdate(
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

//Delete Areas

router.delete("/area/delete/:id", (req, res) => {
  // if area has animals, then we can't delete it
  Cage = find({ area: req.params.id });
  if (Cage) {
    return res.status(400).json({
      message: "Delete Unsuccesfull! Area has cages!",
    });
  }

  Areas.findByIdAndRemove(req.params.id).exec((err, deletedPost) => {
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

//Export

module.exports = router;
