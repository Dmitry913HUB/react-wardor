import "./App.scss";
import {Menu} from "./components/Menu";
import {BrowserRouter,HashRouter, Redirect, Route, Switch } from "react-router-dom";
import {
    createBrowserHistory
 } from "history";
import {Inventory} from "./pages/Inventory";
import {Craft} from "./pages/Craft";
import Staking from "./pages/Staking";
import ProtectedRoute from "./ProtectedRoute";
import {LandingPage} from "./pages/LandingPage";
import Shop from "./pages/Shop";
import { User, UserService } from "./UserService";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {useHistory} from "react-router-dom";

function App() {
    const UserState = useSelector((store) => store.user);
    const locationHistory = useHistory();
    useEffect(()=>{
        // console.log('user is logged',UserState.isLogged)
        if(UserState.isLogged) return (<Redirect to='/staking'/>);
        
    },[UserState.isLogged])
    return (
        <div className="App">
            <HashRouter history={locationHistory}>
                {UserState.isLogged?<Menu/>:<></>}
                
                {/* {UserState.isLogged?<Redirect to='/staking'/>:<Login/>} */}
                <Switch>
                    {/* <Route exact path="/" component={LandingPage}/> */}
                        {/* {UserState.isLogged?<Redirect to='/staking'/>:<Redirect to='/login'/>} */}
                    <ProtectedRoute exact path="/shop" component={Shop}/>
                    <ProtectedRoute exact path="/craft" component={Craft}/>
                    <ProtectedRoute exact path="/inventory" component={Inventory}/>
                    <Route exact path="/login" component={Login}>
                        {UserState.isLogged?<Redirect to='/staking'/>:<Login/>}
                    </Route>
                    <ProtectedRoute exact path="/staking" component={Staking}/>
                    <Redirect to="/staking"/>
                </Switch>
            </HashRouter>
        </div>
    );
}

export default App;
