/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import NavBar from "./components/NavBar";
import Footer from "./components/footer";
import "./CSS/App.css";
import Home from "./components/home";

//User Profile Management
import AdminProfileDashboard from "./components/AdminProfileDash";
import Login from "./components/Login";
import EditProfile from "./components/EditProfile";
import Profile from "./components/profile";
import Signup from "./components/signup";
import AdminUProfileEdit from "./components/AdminUProfileEdit";
import uProfile from "./components/uprofile";
import membersbooking from "./components/MemberBooking";

//Employee Management
import AdminPanelHome from "./components/AdminPanelHome";
import EmployeeDashboard from "./components/Admin/EmployeeDash";
import EditEmployee from "./components/EditPost";
import EmployeeDetails from "./components/PostDetails";

//Research Management
import AddEmployee from "./components/CreatePost";
import EditResearch from "./components/EditResearch";
import CustomerResearchDash from "./components/CustomerResearchDash";
import CreateCollaboration from "./components/CreateCollaboration";

//Medical Management
import MedicalDashboard from "./components/MedicalDashboard";
import CreateMedical from "./components/CreateMedical";
import EditMedical from "./components/EditMedical";
import MedicalDetails from "./components/MedicalDetails";

//Customer Service Management
import TourGuideDashboard from "./components/TourGuideDashboard";
import UpdateBooking from "./components/EditBooking";
import BookingDetails from "./components/BookingDetails";
import RequestBooking from "./components/RequestBooking";

//Adoption Management
import AllAdoptions from "./components/AllAdoptions";
import AdoptionDetails from "./components/AdoptionDetails";
import EditAdoptionDetails from "./components/UpdateAdoption";
import CreateAdoption from "./components/AddAdoption";

//Animal Management
import AnimalDashboard from "./components/AnimalDashboard";
import CreateAnimalPortfolio from "./components/CreateAnimal";
import UpdateAnimalPortfolio from "./components/EditAnimal";
import AnimalDetails from "./components/AnimalDetails";
import AnimalsforAdoption from "./components/AnimalsforAdoption";
import MemberAdoptedAnimals from "./components/MemberAdoptedAnimals";

import ManagementArea from "./components/ManagementArea";
import ManagementAccountTrainer from "./components/ManagementAccountTrainer";
import StaffDash from "./components/Admin/StaffDash"


import Register from "./components/Register";
import CategoryDashBoard from "./components/Category/CategoryDashBoard";

class TourApp extends Component {
  render() {
    return (
      <div>
        <Router>
          <Provider store={store}>
            <NavBar />
            <Route path="/" exact component={Home} />

            <Route exact path="/profile" component={Profile} />
            <Route path="/adoption/add/:id" component={CreateAdoption} />
            <Route path="/AnimalsforAdoption" component={AnimalsforAdoption} />
            <Route
              path="/profile/adoptedanimals/:id"
              component={MemberAdoptedAnimals}
            />
            <Route
              path="/profile/membersbooking/:id"
              component={membersbooking}
            />
          </Provider>

          {/* Routes for Profile management */}

          <Route path="/AdminProfileDash" component={AdminProfileDashboard} />
          <Route path="/profile/update/:id" component={EditProfile} />
          {/* <Route path ="/profile/:id" component={Profile}/> */}
          <Route path="/signup" component={Signup} />
          <Route path="/AdminUProfileEdit/:id" component={AdminUProfileEdit} />
          <Route path="/uprofile/:id" component={uProfile} />

          <Route path="/adminpanelhome" component={AdminPanelHome} />

          <Route path="/EmployeeDash" component={EmployeeDashboard} />
          <Route
            path="/StaffDash"
            component={StaffDash}
          />
          <Route path="/edit/employee/:id" component={EditEmployee} />
          <Route path="/employee/add" component={AddEmployee} />
          <Route path="/employee/details/:id" component={EmployeeDetails} />

          <Route path="/research/edit/:id" component={EditResearch} />
          <Route
            path="/research/customerDash/"
            component={CustomerResearchDash}
          />
          <Route
            path="/research/createCollaboration/"
            component={CreateCollaboration}
          />

          <Route path="/medicalDashboard" component={MedicalDashboard} />
          <Route path="/medical/create" component={CreateMedical} />
          <Route path="/medical/update/:id" component={EditMedical} />
          <Route path="/medical/details/:id" component={MedicalDetails} />

          <Route path="/TourGuideDashboard" component={TourGuideDashboard} />

          <Route path="/booking/update/:id" component={UpdateBooking} />
          <Route path="/booking/details/:id" component={BookingDetails} />
          <Route path="/booking/request" component={RequestBooking} />

          <Route path="/AllAdoptions" component={AllAdoptions} />
          <Route path="/adoption/details/:id" component={AdoptionDetails} />
          <Route path="/adoption/edit/:id" component={EditAdoptionDetails} />

          <Route path="/animaldashboard" component={AnimalDashboard} />
          <Route path="/animal/add" component={CreateAnimalPortfolio} />
          <Route path="/animal/update/:id" component={UpdateAnimalPortfolio} />
          <Route path="/animal/details/:id" component={AnimalDetails} />

          <Route path="/ManagementArea" component={ManagementArea} />
          <Route
            path="/ManagementAccountTrainer"
            component={ManagementAccountTrainer}
          />

          <Route path="/categorydashboard" component={CategoryDashBoard} />

          <Footer />
        </Router>
      </div>
    );
  }
}

export default TourApp;
