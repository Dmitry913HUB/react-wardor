import React from 'react'
import '../styles/login.css'
import { UserService } from '../UserService';
import {useHistory} from "react-router-dom";
import { useDispatch } from 'react-redux';
import {setPlayerLogout} from "../GlobalState/UserReducer";
import {Link} from "react-router-dom";
import Lightning from '../video/Lightning.mp4'

export default function Login() {
    const locationHistory = useHistory();
    const dispatch = useDispatch();
    const handleLogin = () => {
        //console.log('123123123')
        UserService.login(() => {
            if (UserService.isLogged) {
                locationHistory.push("/");
            } else {
                dispatch(setPlayerLogout());
            }
        });
    };
    return (
        <div className='main-login'>
            <video autoPlay loop muted className='video'>
                <source src={Lightning} type="video/mp4"/>
            </video>
            <img src={require('../img/big_logo.png').default} className='main-logo'>
            </img>
            <div className='center loginpage'>
                <div className='login-block'>
                    <div className='unselectable main-h login-text'>
                        Welcome, Wardorer!
                    </div>
                    <button className='unselectable center btn btn-secondary main-pool-dropdown-toggle welcome-login-btn login-btn' onClick={()=>handleLogin()}>
                            LOGIN
                    </button>
                    {/* <Link to="/" className="unselectable center login-btn"
                            onClick={
                                () => {
                                    handleLogin()
                                }
                            }>
                        Login
                    </Link> */}
                </div>
            </div>
        </div>
    )
}
