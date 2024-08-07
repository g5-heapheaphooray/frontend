import React, { Component } from "react";
import "../components/css/Home.css";
import OppService from "../services/OppService";
import withNavigateandLocation from "./withNavigateandLocation";
import { motion, AnimatePresence } from "framer-motion";
import AlertComponent from "./alert.jsx";
import homePic from "../images/homePic.png";
import painting from "../images/test1.png";
import health from "../images/test (3).png";
import plant from "../images/test (2).png";
import elderly from "../images/test (5).png";
import dog from "../images/test (6).png";
import ball from "../images/test (7).png";
import books from "../images/test (8).png";

class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: "",
      showLoginAlert: false,
      showCreateAlert: false,
      itemName: "",
    };
  }

  fetchData = async () => {
    const res = await OppService.getAllOpps();
    // if (res.data.code !== 200) {
    //   this.props.navigate("/login");
    //   window.location.reload()
    // }
    console.log(JSON.stringify(res.data));
    console.log(res.data + typeof res.data);
    this.setState({ items: res.data.events, fullName: res.data.fullName });
  };

  async componentDidMount() {
    await this.fetchData();
    // if (this.props.location.state && this.props.location.state.showAlert) {
    //   this.setState({ showAlert: true }, () => {
    //     console.log("showAlert=", this.state.showAlert);
    //   });
    //   setTimeout(() => {
    //     this.setState({ showAlert: false });
    //   }, 3000);
    // } else
    if (this.props.location.state && this.props.location.state.showLoginAlert) {
      this.setState(
        {
          showLoginAlert: true,
        },
        () => {
          console.log("showLoginAlert=", this.state.showLoginAlert);
        }
      );
      setTimeout(() => {
        this.setState({ showLoginAlert: false });
      }, 3000);
    } else if (this.showCreateAlert) {
      this.setState({ showCreateAlert: true, itemName: this.props.location.state.itemName });
      setTimeout(() => {
        this.setState({ showCreateAlert: false, itemName: "" }, 3000);
      });
    }
  }

  oppButtonHandler = (event) => {
    event.preventDefault();
    this.props.navigate("/opportunities");
  };

  orgButtonHandler = (event) => {
    event.preventDefault();
    this.props.navigate("organisations");
  };

  render() {
    // let items = this.state.items;
    // console.log(items);

    return (
        <>
          <div className="home-content justify-center items-center">
            <motion.div
                initial={{opacity: 0, scale: 0.5}}
                animate={{opacity: 1, scale: 1}}
                transition={{
                  duration: 0.3,
                  ease: [0, 0.71, 0.2, 1.01],
                  scale: {
                    type: "spring",
                    damping: 10,
                    stiffness: 100,
                    restDelta: 0.001,
                  },
                }}
                className="top flex justify-center items-center"
            >
              <img src={homePic} alt="Homepage Image" className="image"></img>
            </motion.div>

            <motion.div
                initial={{opacity: 0, x: "-100vh"}}
                animate={{opacity: 1, x: 0}}
                transition={{type: "spring", duration: 1.5}}
                className="top-title"
            >
              <h1 className="title">
                Volunteer Today, Impact Tomorrow
              </h1>
              <p>Your Journey to Giving Back Starts Here</p>
            </motion.div>
            <motion.div
                className="causes"
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                viewport={{once: true}}
                transition={{
                  type: "spring",
                  delay: 0.2,
                  duration: 2.5,
                }}
            >
              <h1>
                Don't know where to start? <br/>
                Here are some causes to volunteer for!
              </h1>
              <div className="carousel rounded-box">
                <div className="carousel-item">
                  <div className="cause">
                    <a href="/opportunities?cause=animalWelfare">
                      <img
                          className="mask mask-circle"
                          // src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg"
                          src={dog}
                          alt="Dog"
                      />
                      Animal Welfare
                    </a>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="cause">
                      <a href="/opportunities?cause=arts">
                        <img
                            className="mask mask-circle"
                            // src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
                            src={painting}
                            alt="Painting"
                        />
                        Arts
                      </a>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="cause">
                    <a href="/opportunities?cause=education">
                      <img
                          className="mask mask-circle"
                          // src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg"
                          src={books}
                          alt="Books"
                      />
                      Education
                    </a>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="cause">
                    <a href="/opportunities?cause=elderly">
                      <img
                          className="mask mask-circle"
                          // src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg"
                          src={elderly}
                          alt="Elderly"
                      />
                      Eldercare
                    </a>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="cause">
                    <a href="/opportunities?cause=environment">
                      <img
                          className="mask mask-circle"
                          // src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg"
                          src={plant}
                          alt="Plant"
                      />
                      Environment <br/>& Water
                    </a>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="cause">
                    <a href="/opportunities?cause=health">
                      <img
                          className="mask mask-circle"
                          // src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg"
                          src={health}
                          alt="Health"
                      />
                      Health
                    </a>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="cause">
                    <a href="/opportunities?cause=sports">
                      <img
                          className="mask mask-circle"
                          // src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg"
                          src={ball}
                          alt="Ball"
                      />
                      Sports
                    </a>
                  </div>
                </div>
              </div>
              <h1>Or search for more opportunities here!</h1>
              <div className="takeme  flex justify-center items-center">
                <div className="button1">
                  <button className="btn" onClick={this.oppButtonHandler}>
                    Take me there!
                  </button>
                </div>
              </div>
            </motion.div>
            <motion.div
                className="orgs"
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                viewport={{once: true}}
                transition={{
                  type: "spring",
                  delay: 0.2,
                  duration: 2.5,
                }}
            >
              <h1>Want to learn more about the organisations we serve?</h1>
              <div className="takeme  flex justify-center items-center">
                <div className="button2">
                  <button className="btn" onClick={this.orgButtonHandler}>
                    Take me there!
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="fixed bottom-4 right-4 z-50">
            <AlertComponent
                showAlert={this.state.showLoginAlert}
                alertType="info"
                alertMessage={`Welcome back, admin!`}
            />
          </div>
          <div className="fixed bottom-4 right-4 z-50">
            <AlertComponent
                showAlert={this.state.showCreateAlert}
                alertType="success"
                alertMessage={`${this.state.itemName} feedback has been sent to the admin.`}
            />
          </div>
        </>
    );
  }
}

export default withNavigateandLocation(HomeComponent);
