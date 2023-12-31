/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Component } from "react";
import axios from "axios";
import "../CSS/Medicaldashboard.css";

import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

class MedicalDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Medical: [],
    };
  }
  componentDidMount() {
    this.retrieveMedical();
  }

  retrieveMedical() {
    const user = JSON.parse(localStorage.getItem("userData"));
    axios
      .get(`http://localhost:8015/trainer/medical/${user.id}`)
      .then((res) => {
        if (true) {
          this.setState({
            Medical: res.data.existingMedical,
          });
        }
      });
  }

  onDelete = (id) => {
    axios.delete(`http://localhost:8015/medical/delete/${id}`).then((res) => {
      alert("Deleted Successfully");

      this.retrieveMedical();
    });
  };
  //Report Generate Function onClick
  jspdGenerator = () => {
    //Create document obj
    var doc = new jsPDF("p", "pt", "c3");

    doc.html(document.querySelector("#Print"), {
      callback: function (pdf) {
        pdf.save("DashboardCustomer.pdf");
      },
    });
  };
  //End of function report

  render() {
    return (
      <div classsName="containerRan">
        <br />
        <h1 className="titlepage">Ghi nhận sức khỏe</h1>
        <div className="imagemed2"> </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button className="btn btn-success">
            <a href="/medical/create">Tạo mới báo cáo sức khỏe</a>
          </button>

          <button className="btn btn-success" onClick={this.jspdGenerator}>
            Generate Medicals Report
          </button>

          <button className="btn btn-success">
            <a href="/adminpanelhome" x>
              AdminDashboard
            </a>
          </button>
        </div>
        <div
          id="RandimalTable"
          style={{
            backgroundColor: "white",
            width: "80%",
            marginLeft: "0 auto",
          }}
        >
          <table className="table  table-bordered " id="Print">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Zoo Trainer</th>
                <th scope="col">AnimalID</th>
                <th scope="col">Thông tin sức khỏe </th>
                <th scope="col">Ngày tạo</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.Medical.map((medicals, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{medicals.user.name}</td>
                  <td>{medicals.animal.Animal_Name}</td>
                  <td>{medicals.sinfo}</td>
                  <td>
                    {moment(medicals.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                  </td>
                  <td>
                    <a
                      className="btn btn-warning"
                      href={`/medical/update/${medicals._id}`}
                    >
                      <i className="fas fa-edit"></i>&nbsp;Edit
                    </a>
                    &nbsp;
                    <a
                      className="btn btn-danger"
                      href="/medicalDashboard"
                      onClick={() => this.onDelete(medicals._id)}
                    >
                      <i className="far fa-trash-alt"></i>&nbsp;Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default MedicalDashboard;
