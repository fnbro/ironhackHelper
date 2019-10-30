import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './navbar.css';
import './account.scss';
import './settings.scss';
import './randomUser.css'
import './Newsticker.css';
import './myBootcamp.css';
import './home.css';
import './feedback.css';
import './usefulLinks.css';
import * as serviceWorker from './serviceWorker';
import { Router } from 'react-router-dom';
import history from './framework/history';
import axios from 'axios';
import { ActionType, IAction } from './framework/IAction';
import { IState, IUser } from './state/appState'
import { reducerFunctions } from './reducer/appReducer';
import { IUserAction } from './components/Register';


//import framework components
//CS: ClientServices, we will use them a lot, so to shorten the code they are just called: CS
import { CS } from './framework/CS';
//we will add a CS instance to the window object.
//We also want the window object strictly typed, so we declare that window has the type "IWindow"
import { IWindow } from './framework/IWindow'
declare let window: IWindow;
window.CS = new CS();
//we create the inital Application State
window.CS.initializeStore();

reducerFunctions[ActionType.user_logged_in] = function (newState: IState, action: IUserAction) {
  newState.UI.waitingForResponse = false;
  newState.UI.loggedIn = true;
  newState.UI.currentUser = action.user;
  return newState
}


axios.get("auth/loggedin")
  .then(res => {
    const data = res.data;
    console.log(res.data)
    if (data.username) {
      const loggedinAction: IUserAction = {
        type: ActionType.user_logged_in,
        user: data as IUser
      }
      window.CS.clientAction(loggedinAction);
    }
  });


//now we can render this state to the DOM using React
ReactDOM.render(
  <Router history={history}>
    <App stateCounter={window.CS.getUIState().counter} />
  </Router>
  , document.getElementById('root'));


//whenever there is a new state, we render the whole virtual DOM again
//React will take care that only the differences from the previous and
//the current virtual DOM will be rendered to the browser DOM
window.CS.getStore().subscribe(() => {
  window.CS.log("3. before render ---------------------------------------------");
  ReactDOM.render(<Router history={history}>
    <App stateCounter={window.CS.getUIState().counter} />
  </Router>, document.getElementById('root'));
  window.CS.log("3. after render ---------------------------------------------");
});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
