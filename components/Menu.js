import React, {useState} from "react";
import {css} from "glamor";
import {useSelector} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import LogoIcon from "../images/wardor_logo_mini.png";
import {useHistory} from "react-router-dom";
import {UserService} from "../UserService";
import {useDispatch} from "react-redux";
import {setPlayerLogout} from "../GlobalState/UserReducer";
import {Dropdown} from "react-bootstrap"
import "../styles/Menu/MenuBlock.css";
import {IoMenu} from "react-icons/io5"

export const Menu = (props) => {
    const dispatch = useDispatch();
    const locationHistory = useHistory();
    const UserState = useSelector((store) => store.user);
    const [drop, setDrop] = useState(true)

    const changeDropdown = () => {
        setDrop(!drop)
        // //console.log('changed:',drop)
    }

    const handleLogin = () => {
        UserService.login(() => {
            if (UserService.isLogged()) {
                locationHistory.push("/");
            } else {
                dispatch(setPlayerLogout());
            }
        });
    };

    const onHandleLogout = () => {
        UserService.logout();
    };
    return (
        <div>
            <div className={drop ? "menu-block" : "menu-block dropdown"}>
                <div className="unselectable d-flex align-items-center">
                    <img src={LogoIcon} alt="LogoIcon" width="42"/>
                    <div className="unselectable ms-4 text-white">
                        {UserState.isLogged
                            ? `${UserState.name.toUpperCase()}`
                            //${UserState.balance}
                            : ""}
                    </div>
                </div>

                <div className="unselectable center menu-items">
                    {/* <Link to="/" className="unselectable  center menu-href">Main</Link> */}


                    <a target="_blank" href="https://wardor.io" className="unselectable center menu-href"> MAIN </a>

                    {
                        UserState.isLogged ?
                            (
                                <Link to="/staking" className="unselectable center menu-href">STAKING</Link>
                            ) : (
                                <div className="unselectable center menu-href disabled">STAKING</div>
                            )
                    }
                    {
                        UserState.isLogged ?
                            (
                                <Link to="/shop" className="unselectable center menu-href">SHOP</Link>
                            ) : (
                                <div className="unselectable center menu-href disabled">SHOP</div>

                            )
                    }

                    {
                        UserState.isLogged ?
                            (
                                <Link to="/inventory" className="unselectable center menu-href">INVENTORY</Link>
                            ) : (
                                <div className="unselectable center menu-href disabled">INVENTORY</div>

                            )
                    }
                    {/* {
                        UserState.isLogged ?
                            (
                                <Link to="/craft" className="unselectable center menu-href">CRAFT</Link>
                            ) : (
                                <div className="unselectable center menu-href disabled">CRAFT</div>

                            )
                    } */}
                    {
                        !UserState.isLogged ?
                            (
                                <Link to="/" className="unselectable center menu-href"
                                      onClick={handleLogin}>LOGIN</Link>
                            ) :
                            (
                                <Link to="/" className="unselectable center menu-href"
                                      onClick={onHandleLogout}>LOGOUT</Link>
                            )
                    }

                </div>

                <div className='center menu-dropdown' onClick={changeDropdown}>
                    <IoMenu color="white" size={35}/>
                </div>
            </div>
            {
                // <Link to="/" className="unselectable menu-href">Main</Link>
                <div className={drop ? "center menu-items-dropdown" : "center menu-items-dropdown opened"}>
                    {/* <Link to="/" className="unselectable center menu-href-dropdown" onClick={changeDropdown}>Main</Link> */}
                    <a target="_blank" href="https://wardor.io"
                       className="unselectable center menu-href-dropdown"> MAIN </a>
                    {
                        UserState.isLogged ?
                            (
                                <Link to="/staking" className="unselectable center menu-href-dropdown"
                                      onClick={changeDropdown}>STAKING</Link>
                            ) : (
                                <div className="unselectable center menu-href-dropdown disabled"
                                     onClick={changeDropdown}>STAKING</div>

                            )
                    }

                    {
                        UserState.isLogged ?
                            (
                                <Link to="/shop" className="unselectable center menu-href-dropdown"
                                      onClick={changeDropdown}>SHOP</Link>
                            ) : (
                                <div className="unselectable center menu-href-dropdown disabled"
                                     onClick={changeDropdown}>SHOP</div>

                            )
                    }

                    {
                        UserState.isLogged ?
                            (
                                <Link to="/inventory" className="unselectable center menu-href-dropdown"
                                      onClick={changeDropdown}>INVENTORY</Link>
                            ) : (
                                <div className="unselectable center menu-href-dropdown disabled"
                                     onClick={changeDropdown}>INVENTORY</div>

                            )
                    }
                    {/* {
                        UserState.isLogged ?
                            (
                                <Link to="/craft" className="unselectable center menu-href-dropdown"
                                      onClick={changeDropdown}>CRAFT</Link>
                            ) : (
                                <div className="unselectable center menu-href-dropdown disabled"
                                     onClick={changeDropdown}>CRAFT</div>

                            )
                    } */}

                    {
                        !UserState.isLogged ?
                            (
                                <Link to="/" className="unselectable center menu-href-dropdown"
                                      onClick={
                                          () => {
                                              handleLogin()
                                              changeDropdown()
                                          }
                                      }>
                                    LOGIN
                                </Link>
                            ) :
                            (
                                <Link to="/" className="center menu-href-dropdown"
                                      onClick={onHandleLogout}>LOGOUT</Link>
                            )
                    }

                </div>
            }
        </div>

    )
};
