import React, { Component } from 'react';
import { IState, IFeedbackData, IUserData } from '../state/appState';
import { ActionType, IAction } from '../framework/IAction';
import axios from 'axios';
import { reducerFunctions } from '../reducer/appReducer';
import { IWindow } from '../framework/IWindow';
import { IFeedbackLoadedAction, IUsersLoadedAction } from '../App';
import SingleSurvey from './SingleSurvey';
declare let window: IWindow;

interface IProps { };

// READ ALL Surveys
reducerFunctions[ActionType.add_feedbacks_from_server] = function (newState: IState, action: IFeedbackLoadedAction) {
  newState.UI.waitingForResponse = false;
  newState.BM.allSurveys = action.surveys;
  return newState
}

export default class MyBootcamp extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

  }

  componentDidMount() {
    // Get all Feedbacks from Database
    axios.get('/mybootcamp/read').then(response => {
      console.log(response.data)
      const responseAction: IFeedbackLoadedAction = {
        type: ActionType.add_feedbacks_from_server,
        surveys: response.data as IFeedbackData[]
      }
      window.CS.clientAction(responseAction);
    }).catch(function (error) { console.log(error); })

  }

  render() {
    console.log(window.CS.getBMState().allSurveys)
    return (
      <div className="feedbackContainer">
        <p>All Feedbacks: </p>
        <div>
        {window.CS.getBMState().allSurveys.map(survey => <SingleSurvey key={survey._id} survey={survey} />)}
        </div>
      </div>
    )
  }
}