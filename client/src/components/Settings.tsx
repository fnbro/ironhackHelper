import React, { Component } from 'react'
import { ActionType, IAction } from '../framework/IAction';
import { IState, IUser } from '../state/appState'
import axios from 'axios';
import { IWindow } from '../framework/IWindow';
import { reducerFunctions } from '../reducer/appReducer';
import { IUserAction } from './Register';
import history from '../framework/history';

declare let window: IWindow;

export default class Settings extends Component {
    render() {
      if (window.CS.getUIState().isMember)
        return (

            <div>
                Settings
            </div>
        )
        else 
        return (

          <div>
              U are not an Admin
          </div>
      )

      
    }









}
