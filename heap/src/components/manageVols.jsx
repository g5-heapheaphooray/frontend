import React, { Component } from "react";
import "./css/Admin.css";
import withNavigateandLocation from "./withNavigateandLocation";
import AdminService from "../services/AdminService";
import AlertComponent from "./alert";

class ManageVols extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      modalVisible: false,
      modalType: "",
      selectedVol: null,
      showAlert: false,
      alertMessage: "",
    };
  }
  fetchData = async () => {
    const res = await AdminService.getAllVolunteers();
    console.log(JSON.stringify(res.data));
    console.log(typeof res.data);
    this.setState({ items: res.data.users });
  };
  async componentDidMount() {
    await this.fetchData();
  }

  showModal = (modalType, selectedVol) => {
    this.setState({ modalVisible: true, modalType, selectedVol });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
      modalType: "",
      selectedVol: null,
      showAlert: true,
    });
    setTimeout(() => {
      this.setState({ showAlert: false });
    }, 3000);
  };

  handleConfirm = async (e) => {
    e.preventDefault();
    const { modalType, selectedVol } = this.state;

    if (modalType === "blacklist") {
      await this.blacklistVol(selectedVol.email);
    } else if (modalType === "whitelist") {
      await this.whitelistVol(selectedVol.email);
    } else if (modalType === "delete") {
      await this.deleteVol(selectedVol.email);
    }

    this.closeModal();
  };

  blacklistVol = async (id) => {
    await AdminService.blacklistUser(id);
    this.updateVolList(id);
    this.setState({ alertMessage: `${id} blacklisted successfully.` });
  };

  whitelistVol = async (id) => {
    await AdminService.whitelistUser(id);
    this.updateVolList(id);
    this.setState({ alertMessage: `${id} whitelisted successfully.` });
  };

  deleteVol = async (id) => {
    await AdminService.deleteUser(id);
    this.setState({
      items: this.state.items.filter((item) => item.email !== id),
      alertMessage: `${id} deleted successfully.`,
    });
  };

  updateVolList = (id) => {
    let updatedItems = this.state.items.map((item) => {
      if (item.email === id) {
        item.locked = !item.locked;
      }
      return item;
    });
    this.setState({ items: updatedItems });
  };

  blacklistVolHandler = (event, id) => {
    event.preventDefault();
    this.showModal(
      "blacklist",
      this.state.items.find((item) => item.email === id)
    );
  };

  whitelistVolHandler = (event, id) => {
    event.preventDefault();
    this.showModal(
      "whitelist",
      this.state.items.find((item) => item.email === id)
    );
  };

  deleteVolHandler = (event, id) => {
    event.preventDefault();
    this.showModal(
      "delete",
      this.state.items.find((item) => item.email === id)
    );
  };

  // blacklistVolHandler = async (event, id) => {
  //   event.preventDefault();
  //   let result = window.confirm(
  //     "Are you sure you want to blacklist volunteer " + id + "?"
  //   );

  //   if (result) {
  //     await AdminService.blacklistUser(id);
  //     // Assuming AdminService.blacklistUser(id) toggles the blacklist status

  //     // After the operation completes, update the state or modify the item directly
  //     let updatedItems = this.state.items.map((item) => {
  //       if (item.email === id) {
  //         // Toggle the state of the item's blacklist status
  //         item.locked = !item.locked;
  //       }
  //       return item;
  //     });

  //     // Update the state with the modified items array
  //     this.setState({ items: updatedItems });
  //     let item = updatedItems.find((item) => item.email === id);

  //     alert(
  //       "Volunteer " + id + (item.locked ? " blacklisted" : " whitelisted")
  //     );
  //   }
  // };

  // whitelistVolHandler = async (event, id) => {
  //   event.preventDefault();
  //   let result = window.confirm(
  //     "Are you sure you want to whitelist volunteer " + id + "?"
  //   );

  //   if (result) {
  //     await AdminService.whitelistUser(id);

  //     // After the operation completes, update the state or modify the item directly
  //     let updatedItems = this.state.items.map((item) => {
  //       if (item.email === id) {
  //         // Toggle the state of the item's blacklist status
  //         item.locked = !item.locked;
  //       }
  //       return item;
  //     });

  //     // Update the state with the modified items array
  //     this.setState({ items: updatedItems });
  //     let item = updatedItems.find((item) => item.email === id);

  //     alert(
  //       "Volunteer " + id + (item.locked ? " blacklisted" : " whitelisted")
  //     );
  //   }
  // };

  // deleteVolHandler = async (event, id) => {
  //   event.preventDefault();
  //   let result = window.confirm(
  //     "Are you sure you want to delete volunteer " + id + "?"
  //   );
  //   if (result) {
  //     await AdminService.deleteUser(id);
  //     window.location.reload();
  //     alert("Volunteer " + id + " deleted");
  //   }
  // };

  render() {
    let { items, modalVisible, modalType, selectedVol } = this.state;
    console.log("!!!!!!!!!");
    console.log("this.state.items=" + this.state.items);
    return (
      <div className="wrapper">
        <h1 className="title">Manage Volunteers</h1>
        <div className="data-table">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Complaint Count</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}> 
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-bold">{item.fullName}</div>
                        </div>
                      </div>
                    </td>
                    <td>{item.gender}</td>
                    <td>{item.email}</td>
                    <td>{item.complainCount}</td>
                    <td className="manage-button-container">
                    {item.locked ? (
                      <button
                        className="btn btn-primary btn-xs"
                        onClick={(event) =>
                          this.whitelistVolHandler(event, item.email)
                        }
                      >
                        Whitelist
                      </button>
                    ) : (
                      <button
                        className="btn btn-neutral"
                        onClick={(event) =>
                          this.blacklistVolHandler(event, item.email)
                        }
                      >
                        Blacklist
                      </button>
                    )}
                    <button
                      className="btn btn-danger"
                      onClick={(event) =>
                        this.deleteVolHandler(event, item.email)
                      }
                    >
                      Delete
                    </button>
                  </td>
                  </tr>
                ))}
              </tbody>
              {/* foot */}
              <tfoot>
                <tr>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Complaint Count</th>
                  <th>Actions</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {modalVisible && (
          <dialog className="modal modal-bottom sm:modal-middle" open>
            <div className="modal-box">
              <h3 className="font-bold text-lg">
                Are you sure you want to{" "}
                {modalType === "blacklist" && "blacklist"}
                {modalType === "whitelist" && "whitelist"}
                {modalType === "delete" && "delete"} {selectedVol?.fullName}?
              </h3>
              <p className="py-4">Please confirm your choice.</p>
              <div className="modal-action">
                <button className="btn" onClick={this.handleConfirm}>
                  Confirm
                </button>
                <button className="btn" onClick={this.closeModal}>
                  Cancel
                </button>
              </div>
            </div>
          </dialog>
        )}

        <AlertComponent
          showAlert={this.state.showAlert}
          alertType="success"
          alertMessage={this.state.alertMessage}
        />
      </div>
    );
  }
}

export default withNavigateandLocation(ManageVols);
