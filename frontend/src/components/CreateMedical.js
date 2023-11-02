/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import axios from "axios";
import "../CSS/Createmedical.css";

import SplitButton from "react-bootstrap/SplitButton";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Select from "react-select";
import { toast } from "react-toastify";
export default class CreateMedical extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animalID: "",
      sinfo: "",
      posts: [],
      zooAnimal: [],
      userData: null, // Khởi tạo userData là null
    };
    // this.retrievePosts();
    this.ref3 = React.createRef();
    this.ref5 = React.createRef();
  }

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      this.setState({ userData });
    }
    this.retrieveAnimal();
  }

  retrieveAnimal() {
    const user = JSON.parse(localStorage.getItem("userData"));
    axios.get(`http://localhost:8015/trainer/animal/${user.id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          zooAnimal: res.data.existingAnimals,
        });
      }
    });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  onsubmit = async (e) => {
    const user = JSON.parse(localStorage.getItem("userData"));
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const { animalID, sinfo } = this.state;
      const data = {
        user: user.id,
        animal: animalID,
        sinfo: sinfo,
      };
      console.log(data);

      if (data.animalID !== "" && data.sinfo !== "") {
        const response = await axios.post(
          "http://localhost:8015/medical/add",
          data
        );
        if (response.status === 200) {
          toast.success("thành công");
          this.props.history.push("/medicalDashboard");
        }
      } else {
        toast.error("can't empty");
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const handleSelect = (e) => {
      this.state.animalID = e;
      this.ref3.current.value = e;
    };

    return (
      <div className="CreateMedicalBody">
        <div classsName="col-md-8-mt-4-mx-auto">
          <br />
          <h1 className="titlepage" id="RandiCreaTit">
            Create Medical Record
          </h1>

          <div
            style={{ backgroundColor: "white", width: "80%", margin: "0 auto" }}
          >
            <form className=" needs-validation " noValidate id="RandiForm1">
              <div className="form-group">
                <DropdownButton
                  style={{ marginLeft: "-100px" }}
                  align="center"
                  title="Animal ID"
                  id="dropdown-menu-align-end"
                  onSelect={handleSelect}
                >
                  <div>
                    {this.state.zooAnimal.map(
                      (
                        zooAnimal //
                      ) => (
                        <Dropdown.Item eventKey={zooAnimal._id}>
                          {zooAnimal.Animal_Name}
                        </Dropdown.Item>
                      )
                    )}
                  </div>
                </DropdownButton>
                <label style={{ marginBottom: "5px" }} id="RandiForm1">
                  Animal ID
                </label>
                <input
                  type="text"
                  id="randimal"
                  style={{ marginLeft: "-100px" }}
                  className="form-control"
                  name="Attended_Zookeeper"
                  placeholder="Enter The Animal ID:"
                  value={this.state.animalID}
                  onChange={this.handleInputChange}
                  ref={this.ref3}
                />
              </div>

              <div className="form-group" style={{ marginBottom: "15px" }}>
                <label style={{ marginBottom: "5px" }} id="RandiForm1">
                  Surjery Info
                </label>
                <input
                  type="text"
                  style={{ marginLeft: "-100px" }}
                  id="randimal"
                  className="form-control"
                  ref={this.ref5}
                  name="sinfo "
                  placeholder="Enter the Surgery Info "
                  defaultValue={this.state.sinfo}
                  onChange={(event) => {
                    const inputValue = event.target.value;
                    this.setState({ sinfo: inputValue });
                  }}
                />
              </div>
              <br />
              <br />

              <div>
                <button
                  className="btn btn-success"
                  type="submit"
                  style={{ marginBottom: "15px", marginLeft: "50px" }}
                  onClick={this.onsubmit}
                >
                  <i className="far fa-check-square"></i>
                  &nbsp; Submit Medical Report
                </button>

                <button
                  className="btn btn-success"
                  style={{ marginTop: "-50px", marginLeft: "700px" }}
                >
                  <a
                    href="/medicalDashboard"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Dashboard
                  </a>
                </button>
              </div>
            </form>
          </div>
          <br />
        </div>
      </div>
    );
  }
}
