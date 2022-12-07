import { useContext } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomeScreen from "./HomeScreen";
import AllListScreen from "./AllListScreen";
import UserScreen from "./UserScreen";
import SplashScreen from "./SplashScreen";
import AuthContext from "../auth";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";

export default function HomeWrapper() {
  const { auth } = useContext(AuthContext);
  // console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);

  // console.log(auth.isGuest);
  if (auth.loggedIn)
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/allList/" component={AllListScreen} />
            <Route path="/user" component={UserScreen} />
            <Route path="/" component={HomeScreen} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  else if (auth.isGuest) {
    return (
      <div>
      <BrowserRouter>
        <Switch>
          <Route path="/allList/" component={AllListScreen} />
          <Route path="/login/" component={LoginScreen} />
          <Route path="/register/" component={RegisterScreen} />
          <Route path="/user" component={UserScreen} />
        </Switch>
      </BrowserRouter>
    </div>
    );
  }

  return <SplashScreen />;
}
