import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { IWindow } from '../framework/IWindow';

declare let window: IWindow;

export default class nav extends Component {
    render() {
        if (window.CS.getUIState().loggedIn)
        return (
            <nav>
                <div id="ironhack-helper">
                    <NavLink to="/">Ironhack Helper</NavLink>
                </div>
                <div id="nav-links">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/news">News</NavLink>
                    <NavLink to="/feedback">Feedback</NavLink>
                    <NavLink to="/forum">Forum</NavLink>
                    <div id="dropdown">
                        <button id="dropbtn">Extras
                        <i id="fa fa-caret-down"></i>
                        </button>
                        <div id="dropdown-content">
                            <NavLink to="/random-generator">Pair Programming</NavLink>
                            <NavLink to="/links">Helpful Links</NavLink>
                            <NavLink to="/settings">Settings</NavLink>
                        </div>


                    </div>
                    <div>
                        <NavLink to="/login">Logout</NavLink>
                    </div>
                </div>
            </nav>
        )
    else
        return (
            <nav>
                <div id="ironhack-helper">
                    <NavLink to="/">Ironhack Helper</NavLink>
                </div>
                <div id="nav-links">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/news">News</NavLink>
                    <NavLink to="/feedback">Feedback</NavLink>
                    <NavLink to="/forum">Forum</NavLink>
                    <div id="dropdown">
                        <button id="dropbtn">Extras
                        <i id="fa fa-caret-down"></i>
                        </button>
                        <div id="dropdown-content">
                            <NavLink to="/random-generator">Pair Programming</NavLink>
                            <NavLink to="/links">Helpful Links</NavLink>
                            <NavLink to="/settings">Settings</NavLink>
                        </div>
                    </div>
                    <div>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/register">Register</NavLink>
                    </div>
                </div>
            </nav>
        )
    }
}


