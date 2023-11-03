/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import axios from 'axios';
import '../Staff/AddNewArea';
import { FormErrors } from '../FormErrors';


import SplitButton from 'react-bootstrap/SplitButton';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Select from 'react-select'
import { toast } from 'react-toastify';

export default class AddNewArea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: ""
                }
        this.ref = React.createRef();
        this.getAllArea()

    }




    getAllArea() {
        axios.get("http://localhost:8015/area/save").then(res => {
            if (res.data.success) {
                this.setState({
                    areas: res.data.existingAreas
                });
                console.log(this.state.areas)
            }
        })
    }
    // componentDidMount(){
    //     this.getAllArea();
    // }


    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            ...this.state,
            [name]: value
        }, () => { this.validateField(name, value) }
        );
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {
            name
        } = this.state;

        const data = {
            name

        }

        console.log(data);

        axios.post("http://localhost:8015/area/save", data).then((res) => {
            if (res.data.success) {
                this.setState({
                    name: "",
                   

                })
                toast("A New Area Record Has Been Created Successfully!")
            }
        })

    }


    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let Area_IDValid = this.state.Area_IDValid;

        switch (fieldName) {

            case 'Area_Gender':
                Area_IDValid = value.length <= 5;
                fieldValidationErrors.Area_ID = Area_IDValid ? '' : ' is too long';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            Area_IDValid: Area_IDValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.Area_IDValid });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    Demo = () => {
        // this.ref1.current.value = "Test1"
        this.ref2.current.value = "Tom The Cat"
        this.ref3.current.value = "Panthera Felix"
        // this.ref4.current.value = "Test4"
        // this.ref5.current.value = "Test5@"
        // this.ref6.current.value = "Test6"
        // this.ref7.current.value = "Test7"
        // this.ref8.current.value = "Test8"
        // this.ref9.current.value = "Test9"
        // this.ref10.current.value = "Test10"

        // this.state.Area_ID = "Test5@"
        this.state.Area_Name = "Tom The Cat"
        this.state.Area_Species = "Panthera Felix"
        // this.state.Area_Date_Of_Birth = "Test3"
        // this.state.Area_Gender= "Test4"
        // this.state.Feeding_And_Watering_Date = "Test6"
        // this.state.Feeding_And_Watering_Time = "Test7"
        // this.state.Date_Of_Treatment_And_Medical_Care = "Test8"
        // this.state.Time_Of_Treatment_And_Medical_Care = "Test9"
        // this.state.Current_Enclosure_ID = "Test10"


    }

    render() {
        let data2 = parseInt(localStorage.getItem('goo'));
        data2++;
        console.log(String(data2))
        this.state.Area_ID = String(data2)
        let data3 = parseInt(localStorage.getItem('too'));
        data3++;
        console.log(String(data3))
        this.state.Current_Enclosure_ID = String(data3)
        const handleSelect = (e) => {
            console.log(e);

            this.state.value = e
            console.log("Helloooo: " + this.state.value)
            this.state.Attended_Zookeeper = e
            this.ref.current.value = e
        }
        return (
            <div className="AddNewArea-body">
                <center><h1 className="h1-AddNewArea">Tạo mới Area!</h1></center>
                <div container="container-fluid" className="col-md-8 mx-auto" id="chamathCreaForm">

                    <form className="CreateAniHead" noValidate>


                        <div className="form-group" style={{ marginBottom: '15px', }}>
                            <label style={{ marginBottom: '5px' }} id="chamForm">Area Name</label>
                            <input type="text"
                                id="chamathRet"
                                className="form-control"
                                name="name"
                                placeholder="Area Name:"
                                value={this.state.name}
                                onChange={this.handleInputChange}
                            />
                        </div>

                       

                        <button className="btn btn-light btn-small justify-content-between btn-outline-primary" type="submit" style={{ marginTop: '25px', marginBottom: '25px' }} onClick={this.onSubmit}>
                            <i className="fa fa-bug"></i>
                            &nbsp;<b>Tạo mới!</b>
                        </button>
                     
                        <br />

                        <a className="btn btn-light btn-small justify-content-between btn-outline-danger" href={`/ManagementArea`} style={{ marginTop: '10px', marginBottom: '100px', padding: '5px' }}>
                            <i className="fas fa-hippo"></i>&nbsp;<b>Danh sách Area</b>
                        </a>


                    </form>

                </div></div>
        )
    }
}