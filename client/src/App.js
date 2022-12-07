import './App.css';
import { React } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store'
import {
    HomeWrapper,
    LoginScreen,
    RegisterScreen,
} from './components'
import MUIAlertModal from './components/MUIAlertModal';
/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/
/*
  This is the entry-point for our application. Notice that we
  inject our store into all the components in our application.
  
  @author McKilla Gorilla
*/
const App = () => {   
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <GlobalStoreContextProvider>              
                    <Switch>
                        <Route path="/login/" component={LoginScreen} />
                        <Route path="/register/" component={RegisterScreen} />
                        <Route path="/" component={HomeWrapper} />
                    </Switch>
                    <MUIAlertModal />
                </GlobalStoreContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    )
}

export default App