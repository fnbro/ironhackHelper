import React, { Component } from 'react'
import { IWindow } from '../framework/IWindow';
import ironhackLogo from '../images/Ironhack_Logo.png';

declare let window: IWindow;

export default class Startpage extends Component {
    render() {
        return (
            <div>
                <h1>Welcome to the Ironhack helper {window.CS.getBMState().user.firstname} {window.CS.getBMState().user.lastname}!</h1>
                <img src={ironhackLogo} alt="Ironhack Logo"/>
            </div>
        )
    }
}