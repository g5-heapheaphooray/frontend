import React, { Component } from "react";
import "./css/Profile.css";
import pfp from "../pfp.jpg";
import withNavigateandLocation from "./withNavigateandLocation";
import {Link, useLocation} from 'react-router-dom';

class UserProfileComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};

  }

  render() {
    const { state } = this.props.location;
    console.log(state);
    return (
      <>
        <div className="banner h-screen flex justify-center items-center">
          <div className="profile text-center mt-8 font-bold">
            <div className="avatar">
              <div className="w-36 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                <img src={pfp} alt="avatar" />
              </div>
            </div>
            <h1>{state.fullName}</h1>
          </div>
        </div>
        <div className="divider"></div>

        <div className="details-container h-screen flex justify-center items-center">
          <div className="details">
            <h1>Account</h1>
            <br/>
            <div>
              <h2>Name</h2>
              <p>{state.fullName}</p>
            </div>
            <div>
              <h2>Phone Number</h2>
              <p>{state.contactNo}</p>
            </div>
            <div>
              <h2>Gender</h2>
              <p>{state.gender}</p>
            </div>
            <div>
              <h2>Email Address</h2>
              <p>{state.email}</p>
            </div>
            <div>
              <h2>Password</h2>
              <p>{state.password}</p>
              <div className="change-password-container">
                <Link to='/change-password' state={state}>
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