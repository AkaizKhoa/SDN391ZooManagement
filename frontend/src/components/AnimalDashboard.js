import React, { Component } from "react";
import axios from "axios";
import "../CSS/AnimalDashboard.css";
import "jspdf-autotable";

export default class Home extends Component {
  constructor(props) {
    super(props);

    // Initialize An Array To Put The Posted Content

    this.state = {
      zooAnimal: [],
      userData: null, // Khởi tạo userData là null
    };
  }
  //Call The Method Using In-Built React Method ComponentDidMount()
  componentDidMount() {
    this.retrieveAnimal();
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      this.setState({ userData });
    }
  }

  //Method For GET Content For Animal

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

  onDelete = (id) => {
    axios.delete(`http://localhost:8015/animal/delete/${id}`).then((res) => {
      alert("The Animal Record Is Deleted Successfully!");
      this.retrieveAnimal();
    });
  };

  filterData(zooAnimal, searchAnimalKey) {
    const searchResult = zooAnimal.filter((zooAnimal) =>
      zooAnimal.Animal_Name.includes(searchAnimalKey)
    );
    this.setState({ zooAnimal: searchResult });
  }

  handleSearchArea = (e) => {
    const searchAnimalKey = e.currentTarget.value;
    axios.get("http://localhost:8015/animal").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingAnimals, searchAnimalKey);
      }
    });
  };

  //End of function report

  render() {
    const isStaff = this.state.userData && this.state.userData.isStaff;

    return (
      <div className="AnimalDashboard-body">
        <div className="container-fluid">
          <div
            className="col-lg-9 mt-2 mb-2"
            style={{
              borderStyle: "solid",
              width: "100%",
              backgroundColor: "#011a01",
            }}
          >
            <h1
              id="animalHeading"
              style={{
                paddingTop: "-5px",
                paddingTop: "50px",
                color: "white",
                marginLeft: "44%",
              }}
            >
              Danh sách Animal
            </h1>
          </div>

          <div className="col-lg-3 mt-2 mb-2" id="searchingBox">
            <input
              className="form-control"
              id="animalSearch"
              type="search"
              placeholder="Search By Animal ID"
              name="searchQuery"
              onChange={this.handleSearchArea}
            ></input>
          </div>
        </div>
        <div id="OuterTableDiv">
          <table id="AnimalTableChamath">
            <thead>
              <tr className="animalRow">
                <th scope="col">Animal Name</th>
                <th scope="col">Ngày cho ăn</th>
                <th scope="col">Khung giờ</th>
                <th scope="col">Cage</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody className="anCol">
              {this.state.zooAnimal?.map((zooAnimal, index) => (
                <tr key={index}>
                  <td className="anRowing">
                    <a
                      href={`animal/details/${zooAnimal._id}`}
                      style={{ textDecoration: "none" }}
                      id="chamathAnimalID"
                    >
                      {zooAnimal.Animal_Name}
                    </a>
                  </td>
                  <td className="anRowing">
                    {zooAnimal.Feeding_And_Watering_Date}
                  </td>
                  <td className="anRowing">
                    {zooAnimal.Feeding_And_Watering_Time}
                  </td>
                  <td className="anRowing">{zooAnimal.cage.name}</td>
                  {localStorage.setItem("goo", zooAnimal.Animal_ID)}
                  {localStorage.setItem("too", zooAnimal.Current_Enclosure_ID)}
                  <td className="anRowing">
                    <a
                      className="btn btn-light btn-small justify-content-center btn-outline-primary"
                      href={`animal/update/${zooAnimal._id}`}
                      id="updateButton"
                    >
                      <i className="fas fa-feather-alt"></i>&nbsp;<b>Update</b>
                    </a>

                    {isStaff ? (
                      // eslint-disable-next-line jsx-a11y/anchor-is-valid
                      <a
                        className="btn btn-light btn-small justify-content-center btn-outline-danger"
                        onClick={() => this.onDelete(zooAnimal._id)}
                        id="deleteButton"
                      >
                        <i className="fas fa-spider"></i>&nbsp;<b>Delete</b>
                      </a>
                    ) : (
                      " "
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <div
            id="ChamathReportGenDash"
            style={{
              width: "250px",
              margin: "0 auto",
              marginTop: "5px",
              height: "200px",
            }}
          >
            <a
              className="dashButton btn btn-light btn-small justify-content-center btn-outline-primary"
              href={`adminpanelhome`}
              id="chamAdminNav"
              style={{
                marginLeft: "0",
                height: "40px",
                width: "200px",
              }}
            >
              <i className="fa fa-hand-o-left"></i>&nbsp;<b>Back To Admin!!!</b>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
