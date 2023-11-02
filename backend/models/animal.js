//Import Mongoose

const mongoose = require("mongoose");

//Initialize postSchema

const animalSchema = new mongoose.Schema({
  //Initialize The Coloumns, i.e The Properties And Variables
  Animal_Name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
    require: true,
  },
  Animal_Date_Of_Birth: {
    type: String,
    required: true,
  },
  Animal_Gender: {
    type: String,
    required: true,
  },
  Feeding_And_Watering_Date: {
    type: String,
    required: true,
  },
  Feeding_And_Watering_Time: {
    type: String,
    required: true,
  },
  Animal_Satisfaction_Level: {
    type: String,
  },
  Animal_Health_Level: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  cage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cage",
    require: true,
  },

  Date_Of_Treatment_And_Medical_Care: {
    type: String,
  },
  Time_Of_Treatment_And_Medical_Care: {
    type: String,
  },
  Adoptability: {
    type: String,
    required: true,
  },
  Food_Waste_At_Meal: {
    type: Number,
  },
});

//Export The Created Model To Be Utilized In Routes
module.exports = mongoose.model("Animals", animalSchema);
