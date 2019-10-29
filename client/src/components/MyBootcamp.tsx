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

export interface IFilterSurveyAction extends IAction {
  week: string
}

// READ ALL Surveys
reducerFunctions[ActionType.add_feedbacks_from_server] = function (newState: IState, action: IFeedbackLoadedAction) {
  newState.UI.waitingForResponse = false;
  newState.BM.allSurveys = action.surveys;
  return newState
}

reducerFunctions[ActionType.filter_week] = function (newState: IState, action: IFilterSurveyAction) {
  newState.UI.waitingForResponse = false;
  newState.BM.surveyFilter = action.week
  return newState
}

export default class MyBootcamp extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.handleWeekChange = this.handleWeekChange.bind(this);
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
    let weekShow;
    if (window.CS.getBMState().surveyFilter === "all") {
      weekShow = window.CS.getBMState().allSurveys.map(survey => <SingleSurvey key={survey._id} survey={survey} />)
    }
    else {
      weekShow = window.CS.getBMState().allSurveys.filter(survey => survey.feedback_week.toString() === window.CS.getBMState().surveyFilter.toString()).map(survey => <SingleSurvey key={survey._id} survey={survey} />)
    }

    return (
      <div className="feedbackContainer">
        <div>
          <select onChange={this.handleWeekChange} id="SurveyFilter" name="type">
            <option value="all">show me everything...</option>
            <option value="1" >Week 1</option>
            <option value="2">Week 2</option>
            <option value="3">Week 3</option>
            <option value="4">Week 4</option>
            <option value="5">Week 5</option>
            <option value="6">Week 6</option>
            <option value="7">Week 7</option>
            <option value="8">Week 8</option>
            <option value="9">Week 9</option>
            <option value="10">Week 10</option>
            <option value="11">Week 11</option>
            <option value="12">Week 12</option>
          </select>
        </div>
        <h2>All Feedbacks: </h2>
        <div>
          {weekShow}
        </div>
      </div>
    )
  }

  handleWeekChange(event: any) {
    console.log(event.target.value);
    const action: IFilterSurveyAction = {
      type: ActionType.filter_week,
      week: event.target.value
    }
    window.CS.clientAction(action);
  }

}