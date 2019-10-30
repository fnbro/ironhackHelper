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

export interface IErrorMessage extends IAction {
  errorMessage: string;
}

export interface IErrorMessageSearch extends IAction {
  errorMessageSearch: string;
}

export interface ISuccessMessageChange extends IAction {
  successMessageChange: string;
}

export interface ISuccessMessagePassword extends IAction {
  successMessagePassword: string;
}

reducerFunctions[ActionType.password_success] = function (newState: IState, action: ISuccessMessagePassword) {
  newState.UI.waitingForResponse = false;
  newState.UI.newPassword.successMessagePassword = action.successMessagePassword;
  return newState
}

reducerFunctions[ActionType.change_success] = function (newState: IState, action: ISuccessMessageChange) {
  newState.UI.waitingForResponse = false;
  newState.UI.Change.successMessageChange = action.successMessageChange;
  return newState
}

reducerFunctions[ActionType.search_error] = function (newState: IState, action: IErrorMessageSearch) {
  newState.UI.waitingForResponse = false;
  newState.UI.Search.errorMessageSearch = action.errorMessageSearch;
  return newState
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

reducerFunctions[ActionType.passwordchange_error] = function (newState: IState, action: IErrorMessage) {
  newState.UI.waitingForResponse = false;
  newState.UI.Password.errorMessagePassword = action.errorMessage;
  return newState
}

reducerFunctions[ActionType.update_password_change] = function (newState: IState, updateAction: IUserAction) {
  newState.BM.user = updateAction.user;
  newState.UI.currentUser = updateAction.user;
  newState.UI.Password.errorMessagePassword = "";
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
                <option value='Not Registered'>Not Registered</option>
                <option value='Member'>Member</option>
                <option value="Admin">Admin</option>
              </select>
            }
            <div className="form-wrap">
              <div className="input">
                <p>
                  <label htmlFor="username"></label>
                  <input className="form-field" type="username" placeholder="username" onChange={this.handleUsernameRoleChange} />
                </p>
                <input className="button pulse" type='button' onClick={this.handleSearch} value="search" />
                <input className="button pulse" type="button" onClick={this.handleSubmit} value="change" />
                
                <p>{window.CS.getUIState().Search.errorMessageSearch}</p>
                <p>{window.CS.getUIState().Change.successMessageChange}</p>
              </div>
            </div>
          </form>
          <p>
            <h1>Change your Password</h1>
          </p>
          <form onSubmit={this.handlePasswordSubmit}>
            <ul>
              <li>
                <label htmlFor="password"></label>
                <input className="inputFields" type="password" placeholder="new password" onChange={this.handleCheckPassword} value={window.CS.getBMState().user.oldpassword} />
              </li>
              <li>
                <label htmlFor="password"></label>
                <input className="inputFields" type="password" placeholder="confirm new password" onChange={this.handlePasswordChange} value={window.CS.getBMState().user.newpassword} />
              </li>
              <input className="join-btn" type="submit" value="Change" />
              <p>{window.CS.getUIState().Password.errorMessagePassword}</p>
              <p>{window.CS.getUIState().newPassword.successMessagePassword}</p>
            </ul>

          </form>
        </div>
      )
    }
    else if (window.CS.getUIState().currentUser.isMember) {
      return (
        <div>
          <p>
            <h1>Change your Password</h1>
          </p>
          <form onSubmit={this.handlePasswordSubmit}>
            <ul>
              <li>
                <label htmlFor="password"></label>
                <input className="inputFields" type="password" placeholder="new password" onChange={this.handleCheckPassword} value={window.CS.getBMState().user.oldpassword} />
              </li>
              <li>
                <label htmlFor="password"></label>
                <input className="inputFields" type="password" id ="deleteError" placeholder="confirm new password" onChange={this.handlePasswordChange} value={window.CS.getBMState().user.newpassword} />
              </li>
              <input className="join-btn" type="submit" value="Change" />
              <p>{window.CS.getUIState().Password.errorMessagePassword}</p>
             <p className="Maul">{window.CS.getUIState().Change.successMessageChange}</p>
            </ul>
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
      const uiAction: IErrorMessageSearch = {
        type: ActionType.search_error,
        errorMessageSearch: "User has been found"
      }
      const uiActionChange: ISuccessMessageChange = {
        type: ActionType.change_success,
        successMessageChange: ""
      }
      window.CS.clientAction(uiAction);
      window.CS.clientAction(action);
      window.CS.clientAction(uiActionChange);
      selected.options[window.CS.getBMState().settings.foundUser.isAdmin ? 2 : (window.CS.getBMState().settings.foundUser.isMember ? 1 : 0)].selected = true;
    }
    else {
      const uiAction: IErrorMessageSearch = {
        type: ActionType.search_error,
        errorMessageSearch: "User can not be found"
      }
      window.CS.clientAction(uiAction);
    }
  }

  handleUsernameRoleChange(event: any) {
    let user = window.CS.getBMState().settings.foundUser;
    user.username = event.target.value
    const action: IUserAction = {
      type: ActionType.update_user,
      user: user
    }
    const input = document.getElementById('deleteError') as HTMLInputElement;
    if (input === null) {
      const uiAction: IErrorMessageSearch = {
        type: ActionType.search_error,
        errorMessageSearch: ""
      }
      const uiActionChange: ISuccessMessageChange = {
        type: ActionType.change_success,
        successMessageChange: ""
      }
      window.CS.clientAction(uiAction);
      window.CS.clientAction(uiActionChange);
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
        const setRole: IUserAction = {
          type: ActionType.set_role,
          user: res.data as IUser
        }
        const uiActionSearch: IErrorMessageSearch = {
          type: ActionType.search_error,
          errorMessageSearch: ""
        }
        const uiAction: ISuccessMessageChange = {
          type: ActionType.change_success,
          successMessageChange: "Userrole has been updated"
        }
        window.CS.clientAction(uiActionSearch);
        window.CS.clientAction(uiAction);
        window.CS.clientAction(setRole);
      });
  }
  //1 user has been changed 1 for password has been changed
  handleCheckPassword(event: any) {
    let user = window.CS.getBMState().user;
    user.oldpassword = event.target.value
    const action: IUserAction = {
      type: ActionType.update_password,
      user: user
    }
    const uiActionPassword: ISuccessMessagePassword = {
      type: ActionType.password_success,
      successMessagePassword: ""
    }
    window.CS.clientAction(action);
    window.CS.clientAction(uiActionPassword);
  }

  handlePasswordChange(event: any) {
    let user = window.CS.getBMState().user;
    user.newpassword = event.target.value
    const action: IUserAction = {
      type: ActionType.update_password,
      user: user
    }
    const uiActionPassword: ISuccessMessagePassword = {
      type: ActionType.password_success,
      successMessagePassword: ""
    }
    window.CS.clientAction(action);
    window.CS.clientAction(uiActionPassword);
  }

  handlePasswordSubmit(event: any) {
    
    const uiAction: IAction = {
      type: ActionType.server_called
    }
    window.CS.clientAction(uiAction);
    axios.post('/auth/password', window.CS.getBMState().user)
      .then(res => {
        
        const data = res.data;
          if (data.errorMessage) {
            const uiAction: IErrorMessage = {
              type: ActionType.passwordchange_error,
              errorMessage: data.errorMessage
            }
            window.CS.clientAction(uiAction);
          }
          else  {
            const uiAction: IUserAction = {
              type: ActionType.update_password_change,
              user: res.data
            }
            const uiActionPassword: ISuccessMessagePassword = {
              type: ActionType.password_success,
              successMessagePassword: "Password has been changed"
            }
            
            window.CS.clientAction(uiAction);
            window.CS.clientAction(uiActionPassword);
            //history.push("/login")

          }

      });
      event.preventDefault();
  }
}