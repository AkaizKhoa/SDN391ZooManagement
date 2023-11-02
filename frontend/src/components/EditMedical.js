import React, { Component } from "react";
import axios from "axios";
import "../CSS/Medicaldashboard.css";
import { toast } from "react-toastify";

class EditMedical extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zname: "",
      animalID: "",
      sinfo: "",
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
    const id = this.props.match.params.id;

    e.preventDefault();

    const { sinfo } = this.state;

    const data = {
      sinfo: sinfo,
    };
    console.log(data);

    if (data.sinfo !== "") {
      axios
        .put(`http://localhost:8015/medical/update/${id}`, data)
        .then((res) => {
          if (res.data.success) {
            toast.success("update success");
            this.props.history.push("/medicalDashboard");
          }
        });
    } else {
      toast.error("can't not empty");
    }
  };

  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`http://localhost:8015/medical/get/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          zname: res.data.existingMedical.user.name,
          animalID: res.data.existingMedical.animal.Animal_Name,
          sinfo: res.data.existingMedical.sinfo,
        });
      }
    });
  }
  render() {
    return (
      <div classsName="col-md-8-mt-4-mx-auto">
        <button
          className="btn btn-success"
          style={{ marginLeft: "150px", marginTop: "0px", width: "160px" }}
        >
          <a
            href="/medicalDashboard"
            style={{ textDecoration: "none", color: "white" }}
          >
            AdminDashboard
          </a>
        </button>
        <br />
        <h1 className="titlepage" style={{ color: "white", fontSize: "40px" }}>
          Edit Medical Record
        </h1>
        <div
          id="editform"
          style={{
            backgroundColor: "white",
            width: "60%",
            margin: "0 auto",
            paddingTop: "30px",
            paddingBottom: "30px",
            borderRadius: "25px",
            overflow: "hidden",
            marginBottom: "25px",
          }}
        >
          <form
            className="needs-validation"
            noValidate
            style={{
              backgroundColor: "white",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              className="form-group"
              style={{ marginBottom: "15px", width: "500px" }}
            >
              <label style={{ marginBottom: "5px" }}>Zoo Keeper Name</label>
              <input
                type="text"
                className="form-control"
                name="zname"
                placeholder="Enter the Zoo Keeper Name"
                value={this.state.zname}
                onChange={this.handleInputChange}
              />
            </div>

            <div
              className="form-group"
              style={{ marginBottom: "15px", width: "500px" }}
            >
              <label style={{ marginBottom: "5px" }}>Animal Name</label>
              <input
                type="text"
                className="form-control"
                name="animalID"
                placeholder="Enter the animalID"
                value={this.state.animalID}
                onChange={this.handleInputChange}
              />
            </div>

            <div
              className="form-group"
              style={{ marginBottom: "15px", width: "500px" }}
            >
              <label style={{ marginBottom: "5px" }}>Surjery Info </label>
              <input
                type="text"
                className="form-control"
                name="sinfo"
                placeholder="Enter the Surgery Info "
                defaultValue={this.state.sinfo}
                onChange={this.handleInputChange}
              />
            </div>
            <button
              className="btn btn-success"
              style={{}}
              type="submit"
              onClick={this.onSubmit}
            >
              <i className="far fa-check-square"> </i>
              &nbsp; Update
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default EditMedical;
