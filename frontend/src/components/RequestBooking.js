/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import axios from 'axios';
import '../CSS/create-booking.css'
import { FormErrors } from './FormErrors';

export default class CreateBooking extends Component {
    constructor(props) {
        super(props);

        this.state = {
            CustomerEmail:"",
            CustomerName:"",
            MobileNumber:"",
            Date:"",
            Time:"",
            formErrors: {email: '', password:''},
            emailValid: false,
            formvalid: false
         
            
        }
    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
       
    
        switch(fieldName) {
          case 'CustomerEmail':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
         
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        emailValid: emailValid,
                     
                      }, this.validateForm);
      }
    
      validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
      }
    
      errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
      }
    handleInputChange = (e)=>{
        const {name,value} = e.target;
        this.setState({
            ...this.state,
            [name]:value
        },() => { this.validateField(name, value) }
    );
    }


    onsubmit =(e)=>{
        e.preventDefault();
   
        const { CustomerEmail,CustomerName,MobileNumber,Date,Time,} =this.state; 
        const data ={
            CustomerEmail:CustomerEmail,
            CustomerName:CustomerName,
            MobileNumber:MobileNumber,
            Date:Date,
            Time:Time,
        }
        console.log(data);

        axios.post("http://localhost:8015/booking/save", data).then((res)=>{
            if(res.data.success){
                alert(`New Booking created successfully for email  ${CustomerEmail}`)
               
                this.setState(
                {
                    CustomerEmail:"",
                    CustomerName:"",
                    MobileNumber:"",
                    Date:"",
                    Time:"",

                });
            }
        });

        
    }

    render() {
        return (
            <div className="create-booking-body">
            <div class="d-flex flex-column justify-content-center w-100 h-100">
            <div className="col-md-8 mt-4 mx-auto" id="content">
                <div id="header">
             <h1 className="h8 mb-8 font-weight-fw-bold align-content-center" id="crtH">  Đặt tour/vé  </h1>
             </div>
             <br/>
           
                    <br/>
                    
                    <form className="create-form" method='post' >
                        
                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label for="emailC" style={{marginBottom:'5px'}} id="request-lable">Email </label>
                    <input type="email" 
                        className="form-control" 
                        name="CustomerEmail" 
                        id="cEmail"
                        placeholder="Enter your email " 
                        defaultValue={this.state.CustomerEmail}
                        onChange={this.handleInputChange}  
                       
                         required/>
                        
                    </div><div id="Error">
                    <FormErrors formErrors={this.state.formErrors} className="FormError"/></div>
                   

                    <br/>
                    <div className="form-group">
                    <label for="cName" style={{marginBottom:'5px'}} id="request-lable">Tên khách hàng</label>
                        <input type="text" 
                        className="form-control" 
                        id="cName" name="CustomerName" 
                        placeholder="Enter your Name" 
                        defaultValue= {this.state.CustomerName}  
                        onChange={this.handleInputChange} required/>
                        
                    </div>
                    <br/>
                    <div className="form-group">
                    <label for="MobileNo" style={{marginBottom:'5px'}} id="request-lable">Số điện thoại </label>
                        <input type="number" 
                        className="form-control" 
                        id="MobileNo"name="MobileNumber" 
                        placeholder="Enter your mobile number"
                        defaultValue={this.state.MobileNumber}  
                        onChange={this.handleInputChange}  required/>
                        
                    </div>
                    <br/>
                   
                    <br/>
                    <div className="form-group">
                    <label for="Date" style={{marginBottom:'5px'}} id="request-lable">Ngày/Tháng/Năm</label>
                        <input type="date" 
                        className="form-control" 
                        id="Date" 
                        name="Date" 
                        placeholder="Enter date you want to visit"  
                        defaultValue={this.state.Date}  
                        onChange={this.handleInputChange}  required/>
                        
                    </div>
                    <br/>
                    <div className="form-group">
                    <label for="Time" style={{marginBottom:'5px'}} id="request-lable">Khung thời gian </label>
                        <input type="time" 
                        className="form-control" 
                        id="Time" 
                        name="Time"
                        placeholder="Time you want to visit" 
                        defaultValue={this.state.Time}  
                        onChange={this.handleInputChange} required />
                        
                    </div>
                    <br/>
                   
                        <br/><br/>
                        <input type="checkbox" name="terms" id="terms" onchange="activateButton(this)"/>  I Agree Terms and Coditions
                        <br/><br/>
                    <button className="btn btn-success" type="submit" style={{marginBottom:'15px'}} onClick={this.onsubmit}>
                        <i className="far fa-check-square"></i>
                        &nbsp; Submit Booking
                    </button>
                    &nbsp;
                 
                    
                   
                    </form>

                <br/>
                    
                </div>
                  
     


           
            	
</div>
</div>
        )
    }
}

