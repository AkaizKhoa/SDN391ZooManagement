/* eslint-disable no-unused-vars */
/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable react/jsx-no-duplicate-props */
import React, { Component } from "react";
import axios from "axios";
import "../CSS/EditAnimal.css";
import { toast } from "react-toastify";

export default class EditAnimal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Feeding_And_Watering_Date: "",
      Feeding_And_Watering_Time: "",
      Animal_Satisfaction_Level: "",
      Animal_Health_Level: "",
      Attended_Zookeeper: "",
      Date_Of_Treatment_And_Medical_Care: "",
      Time_Of_Treatment_And_Medical_Care: "",
      Current_Enclosure_ID: "",
      Food_Waste_At_Meal: "",
      Adoptability: "false",
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    const {
      Feeding_And_Watering_Date,
      Feeding_And_Watering_Time,
      Animal_Satisfaction_Level,
      Animal_Health_Level,
      Attended_Zookeeper,
      Date_Of_Treatment_And_Medical_Care,
      Time_Of_Treatment_And_Medical_Care,
      Current_Enclosure_ID,
      Food_Waste_At_Meal,
      Adoptability,
    } = this.state;

    const data = {
      Feeding_And_Watering_Date: Feeding_And_Watering_Date,
      Feeding_And_Watering_Time: Feeding_And_Watering_Time,
      Animal_Satisfaction_Level: Animal_Satisfaction_Level,
      Animal_Health_Level: Animal_Health_Level,
      Attended_Zookeeper: Attended_Zookeeper,
      Date_Of_Treatment_And_Medical_Care: Date_Of_Treatment_And_Medical_Care,
      Time_Of_Treatment_And_Medical_Care: Time_Of_Treatment_And_Medical_Care,
      Current_Enclosure_ID: Current_Enclosure_ID,
      Food_Waste_At_Meal: Food_Waste_At_Meal,
      Adoptability: Adoptability,
    };

    if (data.Food_Waste_At_Meal > 0) {
      axios
        .put(`http://localhost:8015/animal/update/${id}`, data)
        .then((res) => {
          if (res.data.success) {
            // alert("Animal Portfolio Updated Successfully!");
            toast.success("update feeding time success");
            this.props.history.push("/animalDashboard");
          }
        });
    } else {
      toast.error("the food waste must greater than 0");
    }
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`http://localhost:8015/animal/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          Feeding_And_Watering_Date: res.data.post.Feeding_And_Watering_Date,

          Feeding_And_Watering_Time: res.data.post.Feeding_And_Watering_Time,

          Animal_Satisfaction_Level: res.data.post.Animal_Satisfaction_Level,

          Animal_Health_Level: res.data.post.Animal_Health_Level,

          Attended_Zookeeper: res.data.post.Attended_Zookeeper,

          Date_Of_Treatment_And_Medical_Care:
            res.data.post.Date_Of_Treatment_And_Medical_Care,

          Time_Of_Treatment_And_Medical_Care:
            res.data.post.Time_Of_Treatment_And_Medical_Care,

          Current_Enclosure_ID: res.data.post.Current_Enclosure_ID,

          Food_Waste_At_Meal: res.data.post.Food_Waste_At_Meal,

          Adoptability: "false",
        });
      }
    });
  }

  render() {
    return (
      <div className="EditAnimal-body">
        <div container="container-fluid" className="col-md-8  mx-auto">
          <center>
            <h1 className="UpdateAniHead">Update The Animal Portfolio</h1>
          </center>
          <div className="ChamathUpdateForm" id="chamathUpdaForm">
            <form className="myFormszzChamath" noValidate>
              <div className="form-group" style={{ marginBottom: "15px" }}>
                <label style={{ marginBottom: "5px" }} id="chamForm">
                  Feeding Date
                </label>
                <input
                  type="date"
                  id="chamathRet"
                  className="form-control"
                  name="Feeding_And_Watering_Date"
                  placeholder="Enter The Feeding_And_Watering_Date:"
                  value={this.state.Feeding_And_Watering_Date}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group" style={{ marginBottom: "15px" }}>
                <label style={{ marginBottom: "5px" }} id="chamForm">
                  Feeding Time
                </label>
                <input
                  type="time"
                  id="chamathRet"
                  className="form-control"
                  name="Feeding_And_Watering_Time"
                  placeholder="Enter The Feeding_And_Watering_Time:"
                  value={this.state.Feeding_And_Watering_Time}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group" style={{ marginBottom: "15px" }}>
                <label style={{ marginBottom: "5px" }} id="chamForm">
                  Feeding Food(kg)
                </label>
                <input
                  type="text"
                  id="food_waste"
                  className="form-control"
                  name="Food_Waste_At_Meal"
                  placeholder="Enter The Food_Waste_At_Meal"
                  value={this.state.Food_Waste_At_Meal}
                  onChange={(event) => {
                    const inputValue = event.target.value;

                    // Use regular expression to check if it's a number
                    if (/^\d+$/.test(inputValue) || inputValue === "") {
                      this.setState({ Food_Waste_At_Meal: inputValue });
                    }
                  }}
                />
              </div>
              <div className="form-group" style={{ marginBottom: "15px" }}>
                <label
                  style={{ marginBottom: "5px" }}
                  for="Adoptability"
                  id="chamForm"
                >
                  Adoptability
                </label>
                &nbsp;&nbsp;
                <input
                  type="checkbox"
                  id="Adoptability"
                  name="Adoptability"
                  placeholder="Enter The Adoptability Status:"
                  value="true"
                  onChange={this.handleInputChange}
                />
              </div>
            </form>
          </div>

          <button
            className="btn btn-light btn-small justify-content-between btn-outline-primary"
            type="submit"
            id="ChamathUp"
            onClick={this.onSubmit}
          >
            <i className="fas fa-otter"></i>
            &nbsp;<b>Update The Animal Portfolio!</b>
          </button>
          <br />
          <a
            className="btn btn-light btn-small justify-content-between btn-outline-danger"
            href={`/animaldashboard`}
            id="ChamathUpssz"
          >
            <i className="fas fa-kiwi-bird"></i>&nbsp;
            <b>Navigate To Animal Portfolio!</b>
          </a>
        </div>
      </div>
    );
  }
}
