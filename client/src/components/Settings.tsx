import React, { Component } from 'react'
import { ActionType, IAction } from '../framework/IAction';
import { IState, IUser, IUserData } from '../state/appState'
import axios from 'axios';
import { IWindow } from '../framework/IWindow';
import { reducerFunctions } from '../reducer/appReducer';
import { IUserAction } from './Register';
import { IUsersLoadedAction } from '../App';

declare let window: IWindow;

export interface IUserAction extends IAction {
  user: IUser
}

reducerFunctions[ActionType.update_user] = function (newState: IState, updateAction: IUserAction) {
  newState.BM.settings.foundUser = updateAction.user;
  return newState
}

reducerFunctions[ActionType.select_user] = function (newState: IState, updateAction: IUserAction) {
  newState.UI.waitingForResponse = false;
  newState.BM.settings.foundUser = updateAction.user;
  return newState
}

reducerFunctions[ActionType.set_role] = function (newState: IState, action: IUserAction) {
  newState.UI.waitingForResponse = false;
  newState.BM.settings.foundUser = action.user;
  return newState
}


export default class Settings extends Component {
  componentDidMount() {
    // Get alle registered useres
    axios.get('/random-generator/read').then(response => {
      const responseAction: IUsersLoadedAction = {
        type: ActionType.add_users_from_server,
        members: response.data as IUserData[]
      }
      window.CS.clientAction(responseAction);
    }).catch(function (error) { console.log(error); })
  }

  render() {
    if (window.CS.getUIState().currentUser.isAdmin) {
      return (
        <div>
          <h1>Settings</h1>
          <form >
            {

              <select id="selectbox" onChange={this.handleMemberAndAdmin} name="role" disabled={false}>
                <option value='Member'>Member</option>
                <option value="Admin">Admin</option>
                <option value='Member'>Not Registered</option>
              </select>

            }
            <div className="form-wrap">
            <div className="input">
            <p>
              <label htmlFor="password"></label>
              <input className="form-field" type="username" placeholder="username" onChange={this.handleUsernameRoleChange} value={window.CS.getBMState().settings.foundUser.username} />
            </p>
            <input className="button pulse" type='button' onClick={this.handleSearch} value="search" />
            <input className="button pulse" type="submit" onClick={this.handleSubmit} value="change" />
           </div>
           </div>
          </form>
        </div>
      )
    }
    else {
      return (
        <div className="errorBody" >
        <div className="error-main">
        <h1>Oops!</h1>
        <div className="error-heading">403</div>
        <p>You do not have permission to access the document or program that you requested.</p>
      </div>
      </div>
      )
    }
  }


  handleMemberAndAdmin(event: any) {
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
    let membersArray = window.CS.getBMState().members.map((user, index) => {
      let usernameMap = user.username
      return usernameMap;
    });
    const search: any = window.CS.getBMState().members.filter(user => user.username === window.CS.getBMState().settings.foundUser.username);
    const selected = document.getElementsByName('role')[0] as HTMLSelectElement;
    if (membersArray.includes(window.CS.getBMState().settings.foundUser.username)) {
      const action: IUserAction = {
        type: ActionType.select_user,
        user: search[0]
      }
      window.CS.clientAction(action);
      selected.options[window.CS.getBMState().settings.foundUser.isAdmin ? 1 : (window.CS.getBMState().settings.foundUser.isMember ? 0 : 1)].selected = true;
    }
    else {
      alert("This User does not exists");
    }
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