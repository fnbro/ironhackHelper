import React from 'react';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import { Switch, Route } from 'react-router-dom';
import { IAction, ActionType } from './framework/IAction';
import { IState, IUserData, INewsData, IFeedbackData } from './state/appState'
import { reducerFunctions } from './reducer/appReducer';
import Startpage from './components/Home';
import WeeklyFeedback from './components/WeeklyFeedback';
import Settings from './components/Settings';
import RandomGenerator from "./components/RandomGenerator";
import Newsticker from "./components/Newsticker";
import UsefulLinks from './components/UsefulLinks';
import MyBootcamp from './components/MyBootcamp';
import { IWindow } from './framework/IWindow';

declare let window: IWindow;

interface IProps {
  stateCounter: number
}

export interface IUsersLoadedAction extends IAction {
  members: IUserData[]
}
export interface INewsLoadedAction extends IAction {
  news: INewsData[]
}
export interface IFeedbackLoadedAction extends IAction {
  surveys: IFeedbackData[]
}

reducerFunctions[ActionType.server_called] = function (newState: IState, action: IAction) {
  newState.UI.waitingForResponse = true;
  return newState;
}
reducerFunctions[ActionType.add_users_from_server] = function (newState: IState, action: IUsersLoadedAction) {
  newState.UI.waitingForResponse = false;
  newState.BM.members = action.members;
  return newState;
}


export default class App extends React.PureComponent<IProps> {

  componentDidMount() {
    const uiAction: IAction = {
      type: ActionType.server_called
    }
    window.CS.clientAction(uiAction);
  }

  render() {
    window.CS.log("App --> render()")
    return (
      <>
        <NavBar />
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Startpage} />
          <Route path="/feedback" component={WeeklyFeedback} />
          <Route path="/settings" component={Settings} />
          <Route path="/random-generator" component={RandomGenerator} />
          <Route path="/news" component={Newsticker} />
          <Route path="/links" component={UsefulLinks} />
          <Route path="/mybootcamp" component={MyBootcamp} />
        </Switch>
      </>
    );
  }

}

