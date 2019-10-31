import React, { Component } from 'react'
import { IWindow } from '../framework/IWindow';
import ironhackLogo from '../images/Ironhack_Logo.png';

declare let window: IWindow;

export default class Startpage extends Component {
    render() {
        return (
            <div>
                <h1 id="homepageTitle">Welcome to the Ironhack helper {window.CS.getBMState().user.firstname} {window.CS.getBMState().user.lastname}!</h1>
                <img id="homepageImage"src={ironhackLogo} alt="Ironhack Logo"/>

                <h1 className="createdBy">Project created by</h1>
                <h2 className="creator">Brückl Stefan</h2>
                <h2 className="creator">Demund Dennis</h2>
                <h2 className="creator">Nestler Florian</h2>
            </div>
        )
    }
}