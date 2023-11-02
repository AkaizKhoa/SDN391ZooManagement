/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import axios from 'axios';

import '../Admin/EmployeeDash'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { toast } from 'react-toastify';






export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accounts: [],
      lastID: "10"
    };

  }


  componentDidMount() {
    this.getAllAccounts();
    localStorage.setItem('foo', this.state.lastID);
  }

  getAllAccounts() {
    axios.get("http://localhost:8015/accounts").then(res => {
      if (res.data.success) {
        this.setState({
          accounts: res.data.existingAccount
        })
        console.log(res.data)
      }
    })
  }

  onUpdateUser = (id) => {
    axios.put(`http://localhost:8015/account/updateUser/${id}`).then((res) => {
      toast("Change Role Successfully");
      this.getAllAccounts()
    })
  }


  onUpdateTrainer = (id) => {
    axios.put(`http://localhost:8015/account/updateTrainer/${id}`).then((res) => {
      toast("Change Role Successfully");
      this.getAllAccounts()
    })
  }


  onUpdateStaff = (id) => {
    axios.put(`http://localhost:8015/account/updateStaff/${id}`).then((res) => {
      toast("Change Role Successfully");
      this.getAllAccounts()
    })
  }









  filterData(accounts, searchKey) {
    const result = accounts.filter((account) =>
      account.name.includes(searchKey)
    )

    console.log(result);
    this.setState({ accounts: result })

  }


  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value


    axios.get("/accounts").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingAccount, searchKey)
      }
    })
  }



  render() {
    return (
      <div className="EmpDashBody">
        <div className="header1">
          <div className="row">

            <div className="col-lg-9 mt-2 mb-2" id="EmpCaption">
              <b>
                <h4 className="Shas99HeadingEmpDash">Quản lí tất cả nhân viên</h4>

              </b>
              <div className="employeeImg"> </div>
              <div id="empbtns" style={{ marginTop: '30px', marginBottom: '30px', width: '100%', display: 'flex', justifyContent: 'start' }}>
                <button className="btn btn-success" style={{ marginLeft: "0", marginTop: "0px", width: "150px" }} >
                  <a href="/adminpanelhome" style={{ textDecoration: "none", color: "white" }}>
                    Admin Home
                  </a>
                </button>


              </div>
            </div>



            <div className="col-lg-3 mt-2 mb-2" id="shas99SearchBar">

              <input style={{ color: '#000' }}
                className="form-control"
                type="search"
                placeholder="  Search for records"
                name="searchQuery"
                onChange={this.handleSearchArea}>

              </input>

            </div>
          </div>

          <table className="table table-bordered table-sm table-hover" style={{}} id="shas99Table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Trainer</th>
                <th scope="col">Staff</th>
                <th scope="col">User</th>
                <th scope="col">Date Of Birth</th>
                <th scope="col">Action</th>

              </tr>
            </thead>
            <tbody>
              {this.state.accounts.map((accounts, index) => (
                <tr>
                  <th >{index + 1}</th>
                  <td>
                    {"E" + accounts._id}
                    {/* {this.state.lastID = accounts.eID} */}
                    {localStorage.setItem('foo', accounts.eID)}
                  </td>
                  <td >{accounts.name}</td>
                  <td>{accounts.email}</td>
                  <td>{accounts.isTrainer ? 'Trainer' : 'Not a Trainer'}</td>
                  <td>{accounts.isStaff ? 'Staff' : 'Not a Staff'}</td>
                  <td>{accounts.isUser ? 'User' : 'Not a User'}</td>
                  <td>{accounts.date}</td>
                  <td>

                    <a className="btn btn-warning" href="#" onClick={() => this.onUpdateUser(accounts._id)} id="shasDelete">
                      &nbsp;SetUser
                    </a>
                    <a className="btn btn-danger" href="#" onClick={() => this.onUpdateTrainer(accounts._id)} id="shasDelete">
                      &nbsp;SetTrainer
                    </a>
                    <a className="btn btn-primary" href="#" onClick={() => this.onUpdateStaff(accounts._id)} id="shasDelete">
                      &nbsp;SetStaff
                    </a>
                  </td>
                </tr>

              ))}

            </tbody>




          </table>

        </div>
        {/* Iwara wena thana */}


      </div>)
  }
}
