/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import axios from "axios";
import "../../CSS/memberdashboard.css";
import "../../CSS/category.css";
import "jspdf-autotable";
import { toast } from "react-toastify";
class CategoryDashBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      isPopupOpen: false,
      isOverPlay: false,
      newCategoryName: "",
    };
  }

  componentDidMount() {
    this.getAllCategory();
  }
  //Retrieve Posts from the backend
  getAllCategory() {
    axios.get("http://localhost:8015/category").then((res) => {
      if (res.data.success) {
        this.setState({
          categories: res.data.existingCategory,
        });
      }
    });
  }

  togglePopup = () => {
    this.setState((prevState) => ({
      isPopupOpen: !prevState.isPopupOpen,
      isOverPlay: !prevState.isOverPlay,
    }));
  };

  handleCategoryNameChange = (event) => {
    this.setState({ newCategoryName: event.target.value });
  };

  addNewCategory = () => {
    const { newCategoryName } = this.state;
    axios
      .post("http://localhost:8015/category/save", {
        categoryName: newCategoryName,
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Add Category Successful");
          this.getAllCategory();
          this.togglePopup();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //End of function report

  render() {
    return (
      <div id="NudujaDash">
        <div className="pgdb" id="headerprofile">
          <div className="prof-dashboard">
            <div style={{ marginTop: "20px" }}>
              <button
                className="btn btn-success"
                style={{ marginLeft: "10%", marginTop: "0", width: "150px" }}
              >
                <a
                  href="/adminpanelhome"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Admin Home
                </a>
              </button>
              <button
                className="btn btn-success"
                style={{ marginLeft: "10%", marginTop: "0", width: "250px" }}
                onClick={this.togglePopup}
              >
                Add New Category
              </button>
            </div>
            <div className="bg_prof"></div> &nbsp;
            <div className="headerprofile">
              <h1 id="profguideheading">
                <center>Manage Category</center> <br />
              </h1>
            </div>
          </div>

          {this.state.isPopupOpen && (
            <>
              <div className="overplay"></div>
              <div className="popup">
                <div className="popup-content">
                  <label>Category Name</label>
                  <div>
                    <input
                      required
                      type="text"
                      name="categoryname"
                      placeholder="category name"
                      value={this.state.newCategoryName}
                      onChange={this.handleCategoryNameChange}
                    />
                  </div>

                  <button
                    className="close"
                    onClick={this.togglePopup} // Close the popup
                  >
                    Close
                  </button>
                  <button
                    className="add"
                    onClick={this.addNewCategory} // Close the popup
                  >
                    Add
                  </button>
                </div>
              </div>
            </>
          )}

          <br />

          <div id="NudujaT">
            <table
              className="profdashboard"
              id="CustomersN"
              style={{ border: "5px" }}
            >
              {/* Table Header */}
              <thead>
                <tr>
                  <th
                    scope="col"
                    style={{
                      width: "50px",
                      fontSize: "20px",
                      textAlign: "center",
                    }}
                  >
                    id
                  </th>
                  <th
                    scope="col"
                    style={{
                      width: "50px",
                      fontSize: "18px",
                      textAlign: "center",
                    }}
                  >
                    Category Name
                  </th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {/* Table Row */}
                {/* Rendering an Array of Data from map */}
                {this.state.categories.map((category, index) => (
                  <tr
                    key={index}
                    style={{ borderBottomColor: "black", border: "1px" }}
                  >
                    <td scope="row" style={{ textAlign: "center" }}>
                      {index + 1}
                    </td>

                    <td style={{ textAlign: "center" }}>
                      {category.categoryName}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default CategoryDashBoard;
