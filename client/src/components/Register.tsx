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

reducerFunctions[ActionType.update_user] = function (newState: IState, updateAction: IUserAction) {
    console.log(updateAction.user);
    newState.BM.user = updateAction.user;
    return newState
}
reducerFunctions[ActionType.user_created] = function (newState: IState, updateAction: IUserAction) {
    console.log(updateAction.user);
    newState.UI.waitingForResponse = false;
    newState.UI.loggedIn = true ;
    return newState
}
export default class Register extends Component {
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="firstname">First name:</label>
                    <input type="text" placeholder="firstname" onChange={this.handleFirstnameChange} value={window.CS.getBMState().user.firstname} />
                    <br />
                    <label htmlFor="lastname">Last name:</label>
                    <input type="text" placeholder="lastname" onChange={this.handleLastnameChange} value={window.CS.getBMState().user.lastname} />
                    <br />
                    <label htmlFor="username">Username:</label>
                    <input type="username" placeholder="Your username" onChange={this.handleUsernameChange} value={window.CS.getBMState().user.username} />
                    <br />
                    <label htmlFor="password">Password:</label>
                    <input type="password" placeholder="********" onChange={this.handlePasswordChange} value={window.CS.getBMState().user.password} />
                    <br />
                    <input type="submit" value="Register as new User" />
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
    handleSubmit(event: any) {
        event.preventDefault();
        const uiAction: IAction = {
            type: ActionType.server_called
        }
        window.CS.clientAction(uiAction);
        axios.post('/auth/signup', window.CS.getBMState().user)
            .then(res => {
                const uiAction: IAction = {
                    type: ActionType.user_created
                }
                history.push('/');
                window.CS.clientAction(uiAction);

                console.log(res.data)
            });
    }
}
