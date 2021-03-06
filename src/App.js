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
import PricingComponent from "./pages/pricing/Pricing.component";
import AdminComponent from "./pages/admin/Admin.component";


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
            </Route>
            <Route path="/aboutus">
              <SecretComponent/>
            </Route>
            <Route path="/dashboard">
              <DashboardComponent/>
              <AboutComponent/>
            </Route>
            <Route path="/profile">
              <ProfileComponent/>
              <AboutComponent/>
            </Route>
            <Route path="/login">
              <div>
              <SighInComponent/>
              </div>
            </Route>
            <Route path="/pricing">
              <PricingComponent/>
              <AboutComponent/>
            </Route>
            <Route path="/admin">
              <AdminComponent/>
              <AboutComponent/>
            </Route>
              <Route path="/">
                <div style={style}>
                  <HomeComponent/>
                </div>
                <AboutComponent/>
              </Route>


          </Switch>
        </Router>
      </div>
  );
}

export default App;
