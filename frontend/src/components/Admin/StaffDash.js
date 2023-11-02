/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import axios from 'axios';

import '../Admin/EmployeeDash'
import 'jspdf-autotable'
import { toast } from 'react-toastify';





export default class StaffDash extends Component {
    constructor(props) {
        super(props);

        this.state = {
            accounts: [],
            lastID: "10"
        };

    }


    componentDidMount() {
        this.getAllStaff();
        localStorage.setItem('foo', this.state.lastID);
    }

    getAllStaff() {
        axios.get("http://localhost:8015/accountstaffs").then(res => {
            if (res.data.success) {

                this.setState({
                    accounts: res.data.existingAccountStaff
                })

            }
        })
    }

    onUpdate = (id) => {
        axios.put(`http://localhost:8015/accountstaff/update/${id}`).then((res) => {
            toast("Unrole Successfully");
            this.getAllStaff()
        })
    }

    filterData(accounts, searchKey) {
        const result = accounts.filter((account) =>
            account.name.includes(searchKey)
        )

        this.setState({ accounts: result })

    }


    handleSearchArea = (e) => {
        const searchKey = e.currentTarget.value

        axios.get("/accountstaffs").then(res => {
            if (res.data.success) {
                this.filterData(res.data.existingAccountStaff, searchKey)
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
                                <h4 className="Shas99HeadingEmpDash">Quản lí tất cả Zoo trainer</h4>

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
                                <th scope="col">Staff ID</th>
                                <th scope="col">Username</th>
                                <th scope="col">E-mail</th>
                                <th scope="col">Role</th>
                                <th scope="col">Date Of Birth</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.accounts?.map((accounts, index) => (
                                <tr>
                                    <th >{index + 1}</th>
                                    <td>
                                        <a href={`/employee/details/${accounts._id}`}>
                                            {"ZT" + accounts._id}
                                        </a>
                                        {/* {this.state.lastID = accounts.eID} */}
                                        {localStorage.setItem('foo', accounts._id)}
                                    </td>
                                    <td >{accounts.name}</td>
                                    <td>{accounts.email}</td>
                                    <td>{accounts.isStaff ? 'Trainer' : 'Not a Trainer'}</td>
                                    <td>{accounts.date}</td>
                                    <td>

                                        <a className="btn btn-danger" href="#" onClick={() => this.onUpdate(accounts._id)} id="shasDelete">
                                            <i className="far fa-trash-alt"></i>&nbsp;Unrole
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
