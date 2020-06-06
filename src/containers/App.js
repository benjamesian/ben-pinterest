import React from "react";
import Navi from "../components/Navi/Navi";
import CreatePinBtn from "../components/CreatePinBtn/CreatePinBtn";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import ResetPassword from "../components/ResetPassword/ResetPassword";
import Profile from "../components/Profile/Profile";
import PinBuilder from "../components/PinBuilder/PinBuilder";
import PageNotFound from "../components/PageNotFound/PageNotFound";
import * as Env from "../environments";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Parse from "parse";

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        Parse.User.current() ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      pins: [],
    };
  }

  setUserHandler = (user) => {
    console.log("Settings app user:", user);
    this.setState({ user });
  };

  deletePinHandler = async function (pinId) {
    console.log("Attempting to delete pin", this, pinId);
    try {
      const Pin = Parse.Object.extend("Pin");
      const query = new Parse.Query(Pin);
      const pin = await query.get(pinId);
      pin.destroy().then(
        (resp) => {
          console.log("successfully deleted pin");
          let pins = [...this.state.pins];
          const pinIndex = pins.findIndex((pin) => pin.pinId === pinId);
          console.log("deleting pin at index", pinIndex);
          pins.splice(pinIndex, 1);
          this.setState({ pins });
        },
        (error) => {
          console.log("Failed to delete pin");
        }
      );
    } catch (e) {
      console.log("Could not delete pin", e);
    }
  };

  editPinHandler = function (pinData) {
    console.log("Attempting to edit pin", pinData);
    this.props.history.push("/pin-builder");
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Navi onLogOut={this.setUserHandler} />
          <Switch>
            <PrivateRoute path="/" exact>
              <Route
                render={(props) => (
                  <Home
                    {...props}
                    deletePinHandler={this.deletePinHandler}
                    editPinHandler={this.editPinHandler}
                  />
                )}
              />
            </PrivateRoute>
            <Route
              path="/login"
              exact
              render={(props) => (
                <Login {...props} onLogIn={this.setUserHandler} />
              )}
            />
            <Route path="/register" exact component={Register} />
            <Route path="/reset_password" exact component={ResetPassword} />
            <PrivateRoute path="/pin-builder" exact>
              <Route
                render={(props) => (
                  <PinBuilder {...props} pinData={this.state.selectedPin} />
                )}
              />
            </PrivateRoute>
            <Route path="/page_not_found" exact component={PageNotFound} />
            <PrivateRoute path="/:username" exact>
              <Route
                render={(props) => (
                  <Profile
                    {...props}
                    deletePinHandler={this.deletePinHandler}
                    editPinHandler={this.editPinHandler}
                    username={props.match.params.username}
                  />
                )}
              />
            </PrivateRoute>
            <Route component={PageNotFound} />
          </Switch>
          <CreatePinBtn user={this.state.user} />
        </div>
      </Router>
    );
  }
}

export default App;
