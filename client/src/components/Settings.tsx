import React, { Component } from 'react'
import { ActionType, IAction } from '../framework/IAction';
import { IState, IUser } from '../state/appState'
import axios from 'axios';
import { IWindow } from '../framework/IWindow';
import { reducerFunctions } from '../reducer/appReducer';
import { IUserAction } from './Register';

declare let window: IWindow;

reducerFunctions[ActionType.update_user] = function (newState: IState, updateAction: IUserAction) {
  newState.BM.settings.foundUser = updateAction.user;
  return newState
}

reducerFunctions[ActionType.select_user] = function (newState: IState, updateAction: IUserAction) {
  newState.BM.settings.foundUser = updateAction.user;
  return newState
}

reducerFunctions[ActionType.set_role] = function (newState: IState, action: IUserAction) {
  newState.UI.waitingForResponse = false;
  newState.BM.settings.foundUser = action.user;
  return newState
}


export default class Settings extends Component {
  render() {
    return (
      <div>

        <form >
          {
          <select onChange={this.handleMemberAndAdmin} name="role" disabled={false}>
            <option  value='Member'>Member</option>
            <option  value="Admin">Admin</option>
            <option  value='Member'>Not Registered</option>
          </select>
          }
          <p>
            <label htmlFor="password"></label>
            <input type="username" placeholder="username" onChange={this.handleUsernameRoleChange} value={window.CS.getBMState().settings.foundUser.username} />
          </p>
          <input type='button' onClick= {this.handleSearch} value="search for the User" />
          <input type="submit" onClick= {this.handleSubmit} value="set Role" />
        </form>
      </div>
    )
  }

  handleOptionSelection = (event: any) => {
    let userMember = window.CS.getBMState().settings.foundUser;
    userMember.isMember = event.target.value === 'Member' ? true : false;
    let userAdmin = window.CS.getBMState().settings.foundUser;
    userAdmin.isAdmin = event.target.value === 'Admin' ? true : false;
    const action: IUserAction = {
      type: ActionType.make_member,
      user: userMember || userAdmin
    }
    window.CS.clientAction(action);
  }

  handleMemberAndAdmin(event: any) {
    console.log(window.CS.getBMState().settings.foundUser.isMember)
    let userMember = window.CS.getBMState().settings.foundUser
    userMember.isMember = event.target.value === 'Member' ? true : false;
    let userAdmin = window.CS.getBMState().settings.foundUser;
    userAdmin.isAdmin = event.target.value === 'Admin' ? true : false;
    const action: IUserAction = {
      type: ActionType.make_member,
      user: userMember || userAdmin
      
    }
    window.CS.clientAction(action);
  }

  handleSearch = () => {
    const search: any = window.CS.getBMState().members.filter(user => user.username.toLowerCase() === window.CS.getBMState().settings.foundUser.username.toLowerCase());
    const action: IUserAction = {
      type: ActionType.select_user,
      user: search[0]
    }
    window.CS.clientAction(action);
    const selected = document.getElementsByName('role')[0] as HTMLSelectElement;
    selected.options[window.CS.getBMState().settings.foundUser.isAdmin ? 1 : (window.CS.getBMState().settings.foundUser.isMember? 0 : 2)].selected = true;
  }

  handleUsernameRoleChange(event: any) {
    let user = window.CS.getBMState().settings.foundUser;
    user.username = event.target.value
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
    axios.put('/auth/settings', window.CS.getBMState().settings.foundUser)
      .then(res => {
        console.log(res.data);
        const setRole: IUserAction = {
          type: ActionType.set_role,
          user: res.data as IUser
        }
        window.CS.clientAction(setRole);
      });
  }
}
