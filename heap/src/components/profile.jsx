import React, { Component } from "react";
import "./css/Profile.css";
import pfp from "../pfp.jpg";
import withNavigateandLocation from "./withNavigateandLocation";
import { Link, useLocation } from "react-router-dom";
import UserService from "../services/UserService";
import { api } from "../services/UserService";
import ToggleThemeComponent from "./toggleTheme.jsx";

class UserProfileComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "",
      fullName: "",
      contactNo: "",
      email: "",
      gender: "",
    };

    // UserService.getProfile().then((res) => {
    // // api.get("/profile").then((res) => {
    //   console.log(res.data)
    //   this.setState({fullName: res.data.fullName,
    //     contactNo: res.data.contactNo,
    //     email: res.data.email,
    //     gender: res.data.gender});
    //   // if (res.data.code === 200) {
    //   //   this.setState({fullName: res.data.fullName,
    //   //     contactNo: res.data.contactNo,
    //   //     email: res.data.email,
    //   //     gender: res.data.gender});
    //   // } else {
    //   //   localStorage.removeItem("token");
    //   //   this.props.navigate("/login");
    //   // }
    //
    // });
  }

  fetchData = async () => {
    const res = await UserService.getProfile();
    // if (res.data.code !== 200) {
    //   this.props.navigate("/login");
    //   window.location.reload()
    // }
    this.setState({
      fullName: res.data.fullName,
      contactNo: res.data.contactNo,
      email: res.data.email,
      gender: res.data.gender,
    });
  };

  changePasswordHandler = (event) => {
    event.preventDefault();
    this.props.navigate("/change-password");
  };

  componentDidMount() {
    // if (localStorage.getItem("token") === null) {
    //   this.props.navigate("/login");
    //   window.location.reload()
    // } else {
    this.fetchData();
    // }

    // if (this.state.code !== 200) {
    //   localStorage.removeItem("token");
    //   this.props.navigate("/login");
    // }
    // UserService.getProfile().then((res) => {
    //   this.setState({fullName: res.data.fullName,
    //     contactNo: res.data.contactNo,
    //     email: res.data.email,
    //     gender: res.data.gender});
    //     console.log(res.data)
    //     // if (res.data.code === 200) {
    //     //   this.setState({
    //     //     fullName: res.data.fullName,
    //     //     contactNo: res.data.contactNo,
    //     //     email: res.data.email,
    //     //     gender: res.data.gender
    //     //   });
    //     // } else {
    //     //   localStorage.removeItem("token");
    //     //   this.props.navigate("/login");
    //     // }
    //   });
  }
  //

  render() {
    // const { state } = this.props.location;
    // console.log(state);
    // console.log(localStorage.getItem("token"));
    // if (!localStorage.getItem('token')){
    //   return;
    // }
    return (
      <>
        <div className="banner h-screen flex justify-center items-center">
          <div className="profile text-center mt-8 font-bold">
            <div className="avatar">
              <div className="w-36 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                <img src={pfp} alt="avatar" />
              </div>
            </div>
            <h1>{this.state.fullName}</h1>
          </div>
        </div>
        <div className="divider"></div>
        <div className="details-container h-screen flex justify-center items-center">
          <div className="details">
            <div className="details-top">
              <h1>Account Details</h1>
              <ToggleThemeComponent></ToggleThemeComponent>
            </div>
            <br />
            <div>
              <h2>Name</h2>
              <p>{this.state.fullName}</p>
            </div>
            <div>
              <h2>Phone Number</h2>
              <p>{this.state.contactNo}</p>
            </div>
            <div>
              <h2>Gender</h2>
              <p>{this.state.gender}</p>
            </div>
            <div>
              <h2>Email Address</h2>
              <p>{this.state.email}</p>
            </div>
            <div>
              <h2>Password</h2>
              <div className="change-password-container">
                <Link to="/change-password">
                  <button className="btn">Change password</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withNavigateandLocation(UserProfileComponent);

// const Profile = () => {
//   return (
//     <>
//       <section className="banner h-screen flex justify-center items-center">
//         <section className="profile text-center mt-8 font-bold">
//           <div class="avatar">
//             <div class="w-36 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
//               <img src={pfp} alt="avatar" />
//             </div>
//           </div>
//           <h1>John Lee</h1>
//         </section>
//       </section>
//       <div className="divider"></div>

//       <section className="details-container h-screen flex justify-center items-center">
//         <section className="details">
//           <h1>Account</h1>
//           <br />
//           <h2>Name</h2>
//           <p>John Lee</p>
//           <h2>Phone Number</h2>
//           <p>1234 5678</p>
//           <h2>Email Address</h2>
//           <p>johnlee@gmail.com</p>
//         </section>
//       </section>
//     </>
//   );
// };

// export default Profile;
