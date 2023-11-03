/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import axios from 'axios';
import '../CSS/create-booking.css'
import { FormErrors } from './FormErrors';
import { toast } from 'react-toastify'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import QRCode from 'qrcode.react';
export default class CreateBooking extends Component {
    constructor(props) {
        super(props);

        this.state = {
            CustomerEmail: "",
            CustomerName: "",
            MobileNumber: "",
            Date: "",
            Time: "",
            Prices: [],
            Quantity: "",
            SelectedPrice: "",
            formErrors: { email: '', password: '' },
            emailValid: false,
            formvalid: false,
            isSubmitted: false, // Thêm trạng thái để kiểm tra đã gửi thành công hay không
            qrData: ''

        }


    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;


        switch (fieldName) {
            case 'CustomerEmail':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;


            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,

        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }
    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            ...this.state,
            [name]: value
        }, () => { this.validateField(name, value) }
        );
    }
    componentDidMount() {
        this.getPrices();
    }
    getPrices() {
        axios.get("http://localhost:8015/price").then(res => {
            if (res.data.success) {
                this.setState({
                    Prices: res.data.existingPrices
                });
            };
        });
    }

    onsubmit = async (e) => {
        e.preventDefault();

        const { CustomerEmail, CustomerName, MobileNumber, Date, Time, SelectedPrice, Quantity, } = this.state;
        const data = {
            CustomerEmail: CustomerEmail,
            CustomerName: CustomerName,
            MobileNumber: MobileNumber,
            Date: Date,
            Time: Time,
            SelectedPrice: SelectedPrice,
            Quantity: Quantity
        }

        if (data.CustomerEmail.trim() !== "" && data.CustomerName.trim() !== ""
            && data.MobileNumber.trim() !== "" && data.Date.trim() !== "" && data.Time.trim() !== ""
            && data.SelectedPrice.trim() !== "" && data.Quantity.trim() !== "") {

            try {
                const response = await axios.post("http://localhost:8015/booking/save", data)
                console.log(response.data.data);
                if (response.status === 200) {
                    this.setState({
                        isSubmitted: true,
                        qrData: JSON.stringify(response.data.data._id), // Chuyển dữ liệu thành JSON để tạo mã QR
                    });
                    this.generateQRCode();
                     setTimeout(() => {this.jspdGenerator()}, 2000)
                    toast.success("Booking success!!")
                    setTimeout(() => {this.props.history.push("/")}, 3000)
                }

            } catch (error) {
                toast.error("Booking fail!!!")
            }

        } else {
            toast.error("Can't empty!!!")
        }


    }



    jspdGenerator = () => {

        //Create document obj
        var doc = new jsPDF("p", "pt", "b3")


        doc.html(document.querySelector("#Booking"), {

            callback: function (pdf) {

                pdf.save("Booking.pdf");

            }

        });


    }


    generateQRCode() {
        // Tạo mã QR code sau khi nhận được ID và đặt nó vào state
        const qrData = this.state.qrData;
        const qrCode = (
            <div style={{display: "flex", flexDirection: "column" , justifyContent: "center", alignItems: "center", marginTop: "50px"}}>
                <h2>QR Code</h2>
                <QRCode value={qrData} />
            </div>
        );
        this.setState({ qrCode });
    }

    render() {
        return (
            <div className="create-booking-body">
                <div class="d-flex flex-column justify-content-center w-100 h-100">
                    <div className="col-md-8 mt-4 mx-auto" id="content">
                        <div id="header">
                            <h1 className="h8 mb-8 font-weight-fw-bold align-content-center" id="crtH">  Đặt tour/vé  </h1>
                        </div>
                        <br />

                        <br />

                        <form className="create-form" method='post' >

                            <div id="Booking">
                            {this.state.isSubmitted && this.state.qrCode}


                                <div className="form-group" style={{ marginBottom: '15px' }}>
                                    <label for="emailC" style={{ marginBottom: '5px' }} id="request-lable">Email </label>
                                    <input type="email"
                                        className="form-control"
                                        name="CustomerEmail"
                                        id="cEmail"
                                        placeholder="Enter your email "
                                        defaultValue={this.state.CustomerEmail}
                                        onChange={this.handleInputChange}

                                        required />

                                </div><div id="Error">
                                    <FormErrors formErrors={this.state.formErrors} className="FormError" /></div>


                                <br />
                                <div className="form-group">
                                    <label for="cName" style={{ marginBottom: '5px' }} id="request-lable">CustomerName</label>
                                    <input type="text"
                                        className="form-control"
                                        id="cName" name="CustomerName"
                                        placeholder="Enter your Name"
                                        defaultValue={this.state.CustomerName}
                                        onChange={this.handleInputChange} required />

                                </div>
                                <br />
                                <div className="form-group">
                                    <label for="MobileNo" style={{ marginBottom: '5px' }} id="request-lable">PhoneNumber</label>
                                    <input type="tel"
                                        maxLength={10}
                                        className="form-control"
                                        id="MobileNo" name="MobileNumber"
                                        placeholder="Enter your mobile number"
                                        defaultValue={this.state.MobileNumber}
                                        onChange={this.handleInputChange} required />

                                </div>
                                <br />

                                <br />
                                <div className="form-group">
                                    <label for="Date" style={{ marginBottom: '5px' }} id="request-lable">Date</label>
                                    <input type="date"
                                        className="form-control"
                                        id="Date"
                                        name="Date"
                                        placeholder="Enter date you want to visit"
                                        defaultValue={this.state.Date}
                                        onChange={this.handleInputChange} required />

                                </div>
                                <br />
                                <div className="form-group">
                                    <label for="Time" style={{ marginBottom: '5px' }} id="request-lable">Time</label>
                                    <input type="time"
                                        className="form-control"
                                        id="Time"
                                        name="Time"
                                        placeholder="Time you want to visit"
                                        defaultValue={this.state.Time}
                                        onChange={this.handleInputChange} required />

                                </div>


                                <div className="form-group">
                                    <label for="Prices" style={{ marginBottom: '5px' }} id="request-lable">Price</label>


                                    <select className="form-control" id="SelectedPrice" onChange={this.handleInputChange} required
                                        name="SelectedPrice">
                                        <option key="" value="">Selection</option>
                                        {this.state.Prices.map(price => (
                                            <option key={price._id} value={price._id}>{price.name}-{price.price}</option>

                                        ))}

                                    </select>

                                </div>
                                <div className="form-group">
                                    <label for="Quantity" style={{ marginBottom: '5px' }} id="request-lable">Quantity</label>
                                    <input type="number" min={0}
                                        className="form-control"
                                        id="Quantity"
                                        name="Quantity"
                                        defaultValue={this.state.Quantity}
                                        onChange={this.handleInputChange} required />

                                </div>

                                <br />

                            </div>

                            <button className="btn btn-success" type="submit" style={{ marginBottom: '15px' }} onClick={this.onsubmit}>
                                <i className="far fa-check-square"></i>
                                Submit Booking
                            </button>
                            &nbsp;



                        </form>

                        <br />

                    </div>






                </div>
            </div>
        )
    }
}

