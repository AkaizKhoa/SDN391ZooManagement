import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import "../CSS/admin-panel-home.css";
import BannerImage from "../images/adminHome2.gif";
import employeePic from "../images/businessman.png";
import userPic from "../images/visitors.png";
import reasearchPic from "../images/documents.png";
import projectPic from "../images/testing.png";
import adoptionPic from "../images/adoption.png";
import medicalPic from "../images/medical-record.png";
import customerServPic from "../images/support.png";
import animalPic from "../images/lion.png";

class AdminPanelHome extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      userData: null, // Khởi tạo userData là null
    };
  }

  componentDidMount() {
    // Lấy dữ liệu từ Local Storage
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      this.setState({ userData });
    }
  }

  render() {
    const isAdmin = this.state.userData && this.state.userData.isAdmin;

    const isStaff = this.state.userData && this.state.userData.isStaff;

    const isTrainer = this.state.userData && this.state.userData.isTrainer;

    return (
      <div className="admin-body" id="admin-id">
        <div
          className="home"
          style={{ backgroundImage: `url(${BannerImage})` }}
        >
          <div className="headerContainer"></div>
        </div>
        {/* Management Section  */}

        <div id="service" class="Services">
          <div class="containerDash">
            <div class="row">
              <div class="col-md-12">
                <div class="titlepage">
                  <h2>Dashboard Management</h2>
                  <p></p>
                </div>
              </div>
            </div>
            <div class="row">
              {isAdmin && (
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                  <Link to="./EmployeeDash">
                    <div class="Services-box">
                      <i>
                        <img src={employeePic} alt="#" id="icons" />{" "}
                      </i>
                      <h3> Quản lí tất cả nhân viên</h3> <br />
                      <p>Quản lí tất cả nhân viên </p>
                    </div>
                  </Link>
                </div>
              )}
              {isStaff && (
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                  <Link to="./ManagementAccountTrainer">
                    <div class="Services-box">
                      <i>
                        <img src={employeePic} alt="#" id="icons" />{" "}
                      </i>
                      <h3> Quản lí Zoo Trainer</h3> <br />
                      <p>Quản lí nhân viên Zoo Trainer </p>
                    </div>
                  </Link>
                </div>
              )}
              {isAdmin && (
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                  <Link to="./StaffDash">
                    <div class="Services-box">
                      <i>
                        <img src={employeePic} alt="#" id="icons" />{" "}
                      </i>
                      <h3> Quản lí Staff Account</h3> <br />
                      <p>Quản lí nhân viên Staff Account </p>
                    </div>
                  </Link>
                </div>
              )}

              {/* <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                <Link to="./adminprofiledash">
                  <div class="Services-box">
                    <i>
                      <img src={userPic} alt="#" id="icons" />
                    </i>
                    <h3>Quản lí thông tin admin</h3>
                    <p>Quản lí thông tin admin</p>
                  </div>
                </Link>
              </div> */}

              {isStaff && (
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                  <Link to="./ManagementArea">
                    <div class="Services-box">
                      <i>
                        <img src={userPic} alt="#" id="icons" />
                      </i>
                      <h3>Quản lí thông tin khu vực(Staff) </h3>
                      <p>Quản lí thông tin khu vực </p>
                    </div>
                  </Link>
                </div>
              )}

              {isTrainer && (
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                  <Link to="./medicalDashboard">
                    <div class="Services-box">
                      <i>
                        <img src={medicalPic} alt="#" id="icons" />
                      </i>
                      <h3>Theo dõi sức khỏe Animal</h3>
                      <p>Tạo các ghi nhận về sức khỏe </p>
                    </div>
                  </Link>
                </div>
              )}

              {/* <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                        <Link to="./ProjectsHome">
                           <div class="Services-box">
                              <i><img src={projectPic} alt="#" id="icons" /></i>
                              <h3>Quản lí Project</h3>
                              <p>Dự án vườn thú (cái này ko cần )</p>
                           </div>
                        </Link>
                     </div> */}

              {isStaff && (
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                  <Link to="./TourGuideDashboard">
                    <div class="Services-box">
                      <i>
                        <img src={customerServPic} alt="#" id="icons" />
                      </i>
                      <h3>Quản lí Tour/Vé</h3>
                      <p>Quản lí dịch vụ tour/vé của du khách</p>
                    </div>
                  </Link>
                </div>
              )}
              {/* <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                        <Link to="./AllAdoptions">
                           <div class="Services-box">
                              <i><img src={adoptionPic} alt="#" id="icons" /></i>
                              <h3>Quản lí nhận nuôi</h3>
                              <p>Thông tin chi tiết nhận nuôi thú cưng  </p>
                           </div>
                        </Link>
                     </div> */}

              {isTrainer && (
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                  <Link to="./animaldashboard">
                    <div class="Services-box">
                      <i>
                        <img src={animalPic} alt="#" id="icons" />
                      </i>
                      <h3>Quản lí Animal</h3>
                      <p>Quản lí thông tin Zoo</p>
                    </div>
                  </Link>
                </div>
              )}

              {isStaff && (
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                  <Link to="./categorydashboard">
                    <div class="Services-box">
                      <i>
                        <img src={animalPic} alt="#" id="icons" />
                      </i>
                      <h3>Management ZooCategory</h3>
                      <p>Quản lí thông tin zoocategory</p>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminPanelHome;
