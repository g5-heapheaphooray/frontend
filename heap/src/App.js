import React from "react";
import "./App.css";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import HomeComponent from "./components/home";
import OpportunitiesComponent from "./components/opps";
import OrganizationsComponent from "./components/orgs";
import UserProfileComponent from "./components/profile";
import OrganisationProfileComponent from "./components/orgProfile";
import Login from "./components/login";
import ResetPassword from "./components/resetPassword";
import ChangePassword from "./components/changePassword";
import OpportunityComponent from "./components/oppDetails";
import CreateOppComponent from "./components/createOpp"
import RegisterVolunteer from "./components/registerVolunteer";
import RegisterOrganisation from "./components/registerOrganisation";
import Logout from "./components/logout";
import LogoutComponent from "./components/logout";
import UserService from "./services/UserService";
import ProtectedRoute from './components/ProtectedRoute';
import RegisteredEvent from "./components/registeredEvent";
import PostedEvent from "./components/postedEvent";
import SignUp from "./components/signUp";
import EditOpp from "./components/editOpp";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route exact index element={<HomeComponent />} />
          <Route exact path="/opportunities/" element={<OpportunitiesComponent />} />
          {/* <Route exact path="/opportunities" element={<OpportunitiesComponent />} /> */}
          <Route exact path="/organisations" element={<OrganizationsComponent />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register-volunteer" element={<RegisterVolunteer />} />
          <Route exact path="/register-organisation" element={<RegisterOrganisation />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/reset-password" element={<ResetPassword />} />
          <Route exact path="/change-password" element={<ChangePassword />} />
          <Route exact path="/opportunities/:id" element={<OpportunityComponent />} />
          <Route exact path="/logout" element={<LogoutComponent />} />
          <Route element={<ProtectedRoute/>}>
            <Route exact path="/user-profile" element={<UserProfileComponent />} />
            <Route exact path="/org-profile" element={<OrganisationProfileComponent />} />
            <Route exact path="/create-opportunity" element={<CreateOppComponent />} />
            <Route exact path="/registered-event" element={<RegisteredEvent />} />
            <Route exact path="/posted-event" element={<PostedEvent />} />
            <Route exact path="/edit-event/:id" element={<EditOpp />} />
          </Route>
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// const rootElement = document.getElementById("root");
// const root = ReactDOM.createRoot(rootElement);
// root.render(<App />);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
