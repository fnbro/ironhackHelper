import React, { Component } from 'react'
import { ActionType, IAction } from '../framework/IAction';
import { IState, IUser } from '../state/appState'
import axios from 'axios';
import { IWindow } from '../framework/IWindow';
import { reducerFunctions } from '../reducer/appReducer';
import history from '../framework/history';

declare let window: IWindow;

export interface IUserAction extends IAction {
    user: IUser
}

export interface IErrorMessage extends IAction {
    errorMessage: string;
}

reducerFunctions[ActionType.register_error] = function (newState: IState, action: IErrorMessage) {
    newState.UI.waitingForResponse = false;
    newState.UI.Register.errorMessageRegister = action.errorMessage;
    return newState
}

reducerFunctions[ActionType.update_user] = function (newState: IState, updateAction: IUserAction) {
    newState.BM.user = updateAction.user;
    newState.UI.Register.errorMessageRegister = "";
    return newState
}
reducerFunctions[ActionType.user_created] = function (newState: IState, updateAction: IUserAction) {
    newState.UI.waitingForResponse = false;
    newState.UI.Register.errorMessageRegister = "";
    newState.BM.user.firstname = "";
    newState.BM.user.lastname = "";
    newState.BM.user.username = "";
    newState.BM.user.password = "";
    newState.BM.user.confirmpassword = "";
    return newState
}
export default class Register extends Component {
    render() {
        return (
            <div className="signupSection">
                <form onSubmit={this.handleSubmit}>
                    <h2 className="signup">Sign Up</h2>
                    <ul className="noBullet">
                        <li>
                            <label htmlFor="firstname"></label>
                            <input className="inputFields" type="text" placeholder="firstname" onChange={this.handleFirstnameChange} value={window.CS.getBMState().user.firstname} />
                        </li>
                        <li>
                            <label htmlFor="lastname"></label>
                            <input className="inputFields" type="text" placeholder="lastname" onChange={this.handleLastnameChange} value={window.CS.getBMState().user.lastname} />
                        </li>
                        <li>
                            <label htmlFor="username"></label>
                            <input className="inputFields" type="username" placeholder="your username" onChange={this.handleUsernameChange} value={window.CS.getBMState().user.username} />
                        </li>
                        <li>
                            <label htmlFor="password"></label>
                            <input className="inputFields" type="password" placeholder="password" onChange={this.handlePasswordChange} value={window.CS.getBMState().user.password} />
                        </li>
                        <li>
                            <label htmlFor="password"></label>
                            <input className="inputFields" type="password" placeholder="confirm password" onChange={this.handleConfirmPasswordChange} value={window.CS.getBMState().user.confirmpassword} />
                        </li>
                        <input className="join-btn" type="submit" value="Register as new User" />
                        <p className="errorMessage">{window.CS.getUIState().Register.errorMessageRegister}</p>
                    </ul>
                </form>
            </div>
        )
    }

    handleFirstnameChange(event: any) {
        let user = window.CS.getBMState().user;
        user.firstname = event.target.value
        const action: IUserAction = {
            type: ActionType.update_user,
            user: user
        }
        window.CS.clientAction(action);
    }
    handleLastnameChange(event: any) {
        let user = window.CS.getBMState().user;
        user.lastname = event.target.value
        const action: IUserAction = {
            type: ActionType.update_user,
            user: user
        }
        window.CS.clientAction(action);
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
    handleConfirmPasswordChange(event: any) {
        let user = window.CS.getBMState().user;
        user.confirmpassword = event.target.value
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
        axios.post('/auth/signup', window.CS.getBMState().user)
            .then(res => {
                const data = res.data;
                if (data.errorMessage) {
                    const uiAction: IErrorMessage = {
                        type: ActionType.register_error,
                        errorMessage: data.errorMessage
                    }
                    window.CS.clientAction(uiAction);
                }
                else {
                    const uiAction: IAction = {
                        type: ActionType.user_created
                    }
                    
                    history.push('/login');
                    window.CS.clientAction(uiAction);

                }

            });
    }
}
