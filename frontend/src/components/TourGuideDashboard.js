/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import axios from "axios";
import '../CSS/tour-guide-dashboard.css'
import jsPDF from 'jspdf'
import 'jspdf-autotable'




class TourGuideDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookings: [],
    };
  }



  componentDidMount() {
    this.retrieveBookings();
  }

  retrieveBookings() {
    axios.get("http://localhost:8015/booking").then((res) => {
      if (res.data.success) {
        this.setState({
          bookings: res.data.existingBookings,
        });
      }
    });
  }

  onDelete = (id) => {
    alert("Deleted Successfully");
    axios.delete(`http://localhost:8015/booking/delete/${id}`).then((res) => {
      this.retrieveBookings();
    });
  };

  filterData(bookings, searchKey) {
    const result = bookings.filter(
      (booking) =>
        booking.CustomerEmail.toLowerCase().includes(searchKey) ||
        booking.CustomerName.toLowerCase().includes(searchKey) ||
        booking._id.toLowerCase().includes(searchKey)
    );
    this.setState({ bookings: result });
  }

  handleSearchBookingQuery = (e) => {
    const searchKey = e.currentTarget.value;
    axios.get("http://localhost:8015/booking").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingBookings, searchKey);
      }
    });
  };

  //Report Generate Function onClick
  jspdGenerator = () => {


    //Create document obj
    var doc = new jsPDF("p", "pt", "b2")


    doc.html(document.querySelector("#customerTable"), {

      callback: function (pdf) {

        pdf.save("DashboardCustomer.pdf");

      }

    });


  }


  render() {
    return (
      <div className="tgdb" id="tgdb">
        <div className="hero-dashboard">
          <div className="bg_tour"></div> &nbsp;
          <div className="header">
            <h1 id="tourguideheading">
              <center>Quản lí Tour/Vé</center> <br />
            </h1>
          </div>
        </div>

        <br />

        <br />
        <div className="Tourdashboard" id="Customers">
          {/* Search Booking */}
          <div className="col-lg-3 mt-2 mb-2" style={{ margin: "15px", marginLeft: "350px" }} >
            <input style={{ width: "500px" }}
              className="form-control"
              type="search"
              placeholder="Search for bookings"
              name="searchQuery"
              onChange={this.handleSearchBookingQuery}>


            </input>

          </div>

          <table className="table table-bordered" id="customerTable">
            <thead className="thead-bg-dark">

              <tr>
                <th scope="col">#</th>
                <th scope="col">QR</th>

                <th scope="col">
                  <b>Customer</b>
                </th>
                <th scope="col">
                  <b>Email</b>
                </th>
                <th scope="col">
                  <b>Phone</b>
                </th>
                <th scope="col">
                  <b>Type</b>
                </th>
                <th scope="col">
                  <b>Date</b>
                </th>
                <th scope="col">
                  <b>Time</b>
                </th>
                <th scope="col">
                  <b>Quantity</b>
                </th>


                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.bookings.map((booking, index) => (
                <tr key={index}>
                  <th scope="row">
                    <a
                      href={`booking/details/${booking._id}`}
                      style={{ textDecoration: false }}
                    >
                      {index + 1}
                    </a>
                  </th>
                  <td>{booking._id}</td>
                  <td>{booking.CustomerName}</td>
                  <td>{booking.CustomerEmail}</td>
                  <td>{booking.MobileNumber}</td>
                  <td>{booking.TourOption}</td>
                  <td>{booking.Date}</td>
                  <td>{booking.Time} </td>
                  <td>{booking.Quantity}</td>
                  <td>
                   
                    <a
                      className="btn btn-danger"
                      href=""
                      onClick={() => this.onDelete(booking._id)}>
                      <i className="far fa-trash-alt"></i> &nbsp; Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

         <div style={{display: 'flex', justifyContent: 'space-around'}}>
            
         
           
            <button className="btn btn-success" >
              <a href="/adminpanelhome" style={{ textDecoration: "none", color: "white" }}>
                Admin Home
              </a>


            </button>



         </div>
        </div>
      </div>
    );
  }
}

export default TourGuideDashboard;
