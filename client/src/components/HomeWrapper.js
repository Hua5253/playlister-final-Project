import { useContext } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomeScreen from "./HomeScreen";
import AllListScreen from "./AllListScreen";
import UserScreen from "./UserScreen";
import SplashScreen from "./SplashScreen";
import AuthContext from "../auth";
import { Statusbar } from ".";

export default function HomeWrapper() {
  const { auth } = useContext(AuthContext);
  // console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);

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
  else return <SplashScreen />;
}
