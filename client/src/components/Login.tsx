import React, { Component } from 'react'
import { ActionType, IAction } from '../framework/IAction';
import { IState, IUser } from '../state/appState'
import axios from 'axios';
import { IWindow } from '../framework/IWindow';
import { reducerFunctions } from '../reducer/appReducer';
import { IUserAction } from './Register';
import history from '../framework/history';
import logoutMeme from '../images/IronhackMeme.png';


declare let window: IWindow;

export interface IErrorMessage extends IAction {
    errorMessage: string;
}

reducerFunctions[ActionType.login_error] = function (newState: IState, action: IErrorMessage) {
    newState.UI.waitingForResponse = false;
    newState.UI.Login.errorMessage = action.errorMessage;
    return newState
}
reducerFunctions[ActionType.user_logged_in] = function (newState: IState, action: IUserAction) {
    newState.UI.waitingForResponse = false;
    newState.UI.Login.errorMessage = "";
    newState.UI.loggedIn = true;
    newState.BM.user = action.user;
    newState.UI.currentUser = action.user;
    return newState
}
reducerFunctions[ActionType.user_logged_out] = function (newState: IState, action: IUserAction) {
    newState.UI.waitingForResponse = false;
    newState.UI.Login.errorMessage = "";
    newState.UI.loggedIn = false;
    newState.BM.user = { lastname: "", firstname: "", username: "", password: "", confirmpassword: "",newpassword:"", oldpassword:"", isMember: false, isAdmin: false };

    return newState
}

export default class Login extends Component {
    render() {
        if (window.CS.getUIState().loggedIn)
            return (
                <div>
                    <img src={logoutMeme} alt="Logout Meme"/>
                    <p>You are logged in as {window.CS.getBMState().user.username}</p>
                    <button className="join-btn" onClick={this.handleLogout}>Logout</button>
                </div>
            )
        else
            return (
                <div className="signupSection">
                    <form onSubmit={this.handleSubmit}>
                        <h2 className="signup">Login</h2>
                        <ul className="noBullet">
                            <li>
                                <label htmlFor="username"></label>
                                <input className="inputFields" type="username" placeholder="Your username" onChange={this.handleUsernameChange} value={window.CS.getBMState().user.username} />
                            </li>
                            <li>
                                <label htmlFor="password"></label>
                                <input className="inputFields" type="password" placeholder="password" onChange={this.handlePasswordChange} value={window.CS.getBMState().user.password} />
                            </li>
                            <input className="join-btn" type="submit" value="Login" />
                            <p className="errorMessage">{window.CS.getUIState().Login.errorMessage}</p>
                        </ul>
                    </form>
                </div>
            )
    }


    handleUsernameChange(event: any) {
        let user = window.CS.getBMState().user;
        user.username = event.target.value
        const action: IUserAction = {
            type: ActionType.update_user,
            user: user
        }
        window.CS.clientAction(action);
    }
    handlePasswordChange(event: any) {
        let user = window.CS.getBMState().user;
        user.password = event.target.value
        const action: IUserAction = {
            type: ActionType.update_user,
            user: user
        }
        window.CS.clientAction(action);
    }

    handleSubmit(event: any) {
        event.preventDefault();
        const uiAction: IAction = {
            type: ActionType.server_called
        }
        window.CS.clientAction(uiAction);
        axios.post('/auth/login', window.CS.getBMState().user)
            .then(res => {
                const data = res.data;
                console.log(res.data)
                if (data.errorMessage) {
                    const uiAction: IErrorMessage = {
                        type: ActionType.login_error,
                        errorMessage: data.errorMessage
                    }
                    window.CS.clientAction(uiAction);
                } else {
                    const loggedinAction: IUserAction = {
                        type: ActionType.user_logged_in,
                        user: data as IUser
                    }
                    window.CS.clientAction(loggedinAction);
                    history.push("/");
                }
            });
    }

    handleLogout() {
        const uiAction: IAction = {
            type: ActionType.server_called
        }
        window.CS.clientAction(uiAction);
        axios.get('/auth/logout').then(res => {
            const loggedoutAction: IAction = {
                type: ActionType.user_logged_out
            }
            window.CS.clientAction(loggedoutAction);
        }
        );
        window.location.reload();
    }

}