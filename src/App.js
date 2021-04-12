import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect} from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import NavbarComponent from "./pages/main/navbar/components/Navbar.component";
import HomeComponent from "./pages/homepage/components/Home.component";
import SignUpComponent from "./pages/signup/components/SignUp.component";
import bg from "./pages/homepage/assets/insurance001.jpg";
import AboutComponent from "./pages/main/about/components/About.component";
import SighInComponent from "./pages/signin/components/SighIn.component";
import bg1 from "./pages/homepage/assets/bg.jpg";
import DashboardComponent from "./pages/dashboard/Dashboard.component";
import ProfileComponent from "./pages/profile/Profile.component";
import SecretComponent from "./pages/main/info/components/SecretPage.component";
import {useSelector, useDispatch} from "react-redux";

import storage from "./store/sessionStore";
import {setCurrentUser} from "./actions/SignUp.actions";


function App() {

  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser)

  useEffect(()=>{
      if(!currentUser.name && storage.loadUser()) {
        dispatch({ type: setCurrentUser(), payload: storage.loadUser() });
      } else {
        storage.setUser(currentUser);
      }
  })

  const style = {
    backgroundImage : `url("`+bg1+`")`
  }
  return (
      <div className="fooont">
        <Router>
          <NavbarComponent/>
          <Switch>
            <Route path="/registration">
              <div className='wrapper'>
                <SignUpComponent />
              </div>
              <AboutComponent/>
            </Route>
            <Route path="/aboutus">
              <SecretComponent/>
            </Route>
            <Route path="/dashboard">
              <DashboardComponent/>
            </Route>
            <Route path="/profile">
              <ProfileComponent/>
            </Route>
            <Route path="/login">
              <div className='wrapper'>
                <SighInComponent/>
              </div>
              <AboutComponent />
            </Route>
            <div>
              <Route path="/">
                <div style={style}>
                  <HomeComponent/>
                </div>
                <AboutComponent/>
              </Route>
            </div>

          </Switch>
        </Router>
      </div>
  );
}

export default App;
