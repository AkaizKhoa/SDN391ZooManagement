/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import axios from 'axios';
import "../Staff/ManagementArea";
import {Link} from 'react-router-dom';
import jsPDF from 'jspdf'
import 'jspdf-autotable'

class ManagementArea extends Component {

  constructor(props){
    super(props);

    this.state={
      areas:[]
    }
  }

  componentDidMount(){
    this.getAllArea();
  }
  //Retrieve Posts from the backend
  getAllArea(){
    axios.get("http://localhost:8015/area").then(res =>{
      if(res.data.success){
        this.setState({
          areas:res.data.existingAreas
        });       
      };
    });
  }

  //Delete a profile
  // onDelete =(id)=>{
  
  //   axios.delete(`http://localhost:8015/profile/delete/${id}`).then((res) =>{
    
  //     alert("Deleted Successfully");
    
  //     this.getAllArea();
  //   })    
  // }

  //Report Generate Function onClick
jspdGenerator=()=>{

        
  //Create document obj
  var doc =new jsPDF("p","pt","b3") 


  doc.html(document.querySelector("#CustomersN"), {
    
    callback:function(pdf){

      pdf.save("DashboardCustomer.pdf");
      
    }

  });

 
}
//End of function report 


  render() {
    return (
      <div id="NudujaDash">
          
          <div className="pgdb" id="headerprofile">
          
            <div className="prof-dashboard">
            
              <div className="bg_prof"></div> &nbsp;
                 {/* For Header */}
                <div className="headerprofile">   
                     <h1 id="profguideheading">
                       <center>Quản lí thông tin khu vực</center> <br />
                     </h1>
                 </div>
              </div>

                  <br />
              {/* Begin table */}
              <div id="NudujaT">
              <table className="profdashboard" id="CustomersN" style={{border:'5px'}}>
                {/* Table Header */}
                <thead>
                  <tr>
                    <th scope="col" style={{width:'50px',fontSize:'20px',textAlign:'center'}}>#</th>
                    <th scope="col" style={{width:'50px',fontSize:'18px',textAlign:'center'}}>Area Name</th>
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                  {/* Table Row */}
                  {/* Rendering an Array of Data from map */}
                  {this.state.areas.map((areas,index) => (
                    <tr key={index} style={{borderBottomColor:'black',border:'1px'}}>
                      <td scope="row" style={{textAlign:'center'}}>{index+1}</td>
                  
                      <td style={{textAlign:'center'}}>{areas.name}</td>
                     
                    </tr>
                  ))}
                </tbody>
              </table>
              </div> 
                <div >
                  <button className="btn btn-success" style={{marginLeft:"10%", marginTop:"0",width:"150px"}} >
                    <a href="/adminpanelhome" style={{ textDecoration: "none", color: "white" }}>
                      Admin Home
                    </a>
                    </button>
                    <button className="btn btn-success" style={{marginLeft:"10%", marginTop:"0",width:"150px"}} >
                    <a href="/AddNewArea" style={{ textDecoration: "none", color: "white" }}>
                      Add new area
                    </a>
                    </button>
                
                </div>
            </div>
          </div>      
    );
  }
  
}
export default ManagementArea;