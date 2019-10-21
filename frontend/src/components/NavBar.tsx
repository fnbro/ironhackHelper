import * as React from 'react';
import { NavLink } from 'react-router-dom';

const nav = (props: any) => {
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
                        <NavLink to="/random">Pair Programming</NavLink>
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
export default nav;