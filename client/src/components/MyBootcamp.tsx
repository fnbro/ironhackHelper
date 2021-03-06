import React, { Component } from 'react';
import { IState, IFeedbackData, IFilter } from '../state/appState';
import { ActionType, IAction } from '../framework/IAction';
import axios from 'axios';
import { reducerFunctions } from '../reducer/appReducer';
import { IWindow } from '../framework/IWindow';
import { IFeedbackLoadedAction } from '../App';
import SingleSurvey from './SingleSurvey';
declare let window: IWindow;

interface IProps { };

export interface IFilterSurveyAction extends IAction {
  filter: IFilter
}

// READ ALL Surveys
reducerFunctions[ActionType.add_feedbacks_from_server] = function (newState: IState, action: IFeedbackLoadedAction) {
  newState.UI.waitingForResponse = false;
  newState.BM.allSurveys = action.surveys;
  return newState
}

reducerFunctions[ActionType.filter_survey] = function (newState: IState, action: IFilterSurveyAction) {
  newState.UI.waitingForResponse = false;
  newState.BM.surveyFilter.weekFilter = action.filter.weekFilter;
  newState.BM.surveyFilter.userFilter = action.filter.userFilter;
  return newState
}

export default class MyBootcamp extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.handleWeekChange = this.handleWeekChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);

  }

  componentDidMount() {
    // Get all Feedbacks from Database
    axios.get('/mybootcamp/read').then(response => {
      const responseAction: IFeedbackLoadedAction = {
        type: ActionType.add_feedbacks_from_server,
        surveys: response.data as IFeedbackData[]
      }
      window.CS.clientAction(responseAction);
    }).catch(function (error) { console.log(error); })

  }

  render() {
    let weekShow;
    if (window.CS.getBMState().surveyFilter.weekFilter === "all") {
      if (window.CS.getBMState().surveyFilter.userFilter === "none") {
        weekShow = window.CS.getBMState().allSurveys
      }
      else {
        weekShow = window.CS.getBMState().allSurveys.filter(survey => survey.submitted_by.username.toString().includes(window.CS.getBMState().surveyFilter.userFilter))
      }
    }
    else {
      if (window.CS.getBMState().surveyFilter.userFilter === "none") {
        weekShow = window.CS.getBMState().allSurveys.filter(survey => survey.feedback_week.toString() === window.CS.getBMState().surveyFilter.weekFilter.toString())
      }
      else {
        weekShow = window.CS.getBMState().allSurveys.filter(survey => survey.feedback_week.toString() === window.CS.getBMState().surveyFilter.weekFilter.toString() && survey.submitted_by.username.toString().includes(window.CS.getBMState().surveyFilter.userFilter))
      }
    }

    if (window.CS.getUIState().currentUser.isAdmin) {
    return (
      <div className="feedbackContainer">
        <div className="filterSection">
          <h3>Filter:</h3>
          <div>
            <label htmlFor="weekFilter">Week: </label>
            <select onChange={this.handleWeekChange} id="weekFilter" name="weekFilter">
              <option value="all">show me all weeks</option>
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
          <div>
            <label htmlFor="userFilter">Username: </label>
            <input className="filterinput" type="text" id="userFilter" onChange={this.handleUserChange} />
          </div>
        </div>
        <h2>Evaluation of selected Feedbacks: </h2>
        <div className="singleSurveyContainer">
          <p><span className="feedbackHead">Scale (0-10) how satisfied you are with the Bootcamp: </span><b>{(weekShow.reduce((acc, val) => (acc + val.feedback_satisfied) ,0 )/weekShow.length).toFixed(1)} Ø</b></p>
          <p className="feedbackHead">Please pick 3 areas of your learning experience that you think we are doing well (check 3 that apply):</p>
          <ul>
            <li>- Curriculum topics and structure <b>({weekShow.filter(survey => survey.feedback_happy.includes(1)).length})</b></li>
            <li>- Curriculum difficulty level <b>({weekShow.filter(survey => survey.feedback_happy.includes(2)).length})</b></li>
            <li>- Quality of lessons<b>({weekShow.filter(survey => survey.feedback_happy.includes(3)).length})</b></li>
            <li>- Quality of labs (WebDev & Data) and projects (UX/UI) <b>({weekShow.filter(survey => survey.feedback_happy.includes(4)).length})</b></li>
            <li>- Teacher technical skills <b>({weekShow.filter(survey => survey.feedback_happy.includes(5)).length})</b></li>
            <li>- Teacher teaching ability <b>({weekShow.filter(survey => survey.feedback_happy.includes(6)).length})</b></li>
            <li>- Teacher accessibility <b>({weekShow.filter(survey => survey.feedback_happy.includes(7)).length})</b></li>
            <li>- Teacher´s Assistant abilities <b>({weekShow.filter(survey => survey.feedback_happy.includes(8)).length})</b></li>
            <li>- Helping you achieve your personal learning goals <b>({weekShow.filter(survey => survey.feedback_happy.includes(9)).length})</b></li>
          </ul>
          <p className="feedbackHead">Please pick 3 areas of your learning experience that you think we need to improve most (check 3 that apply):</p>
          <ul>
            <li>- Curriculum topics and structure <b>({weekShow.filter(survey => survey.feedback_unhappy.includes(1)).length})</b></li>
            <li>- Curriculum difficulty level <b>({weekShow.filter(survey => survey.feedback_unhappy.includes(2)).length})</b></li>
            <li>- Quality of lessons <b>({weekShow.filter(survey => survey.feedback_unhappy.includes(3)).length})</b></li>
            <li>- Quality of labs (WebDev & Data) and projects (UX/UI) <b>({weekShow.filter(survey => survey.feedback_unhappy.includes(4)).length})</b></li>
            <li>- Teacher technical skills <b>({weekShow.filter(survey => survey.feedback_unhappy.includes(5)).length})</b></li>
            <li>- Teacher teaching ability <b>({weekShow.filter(survey => survey.feedback_unhappy.includes(6)).length})</b></li>
            <li>- Teacher accessibility <b>({weekShow.filter(survey => survey.feedback_unhappy.includes(7)).length})</b></li>
            <li>- Teacher´s Assistant abilities <b>({weekShow.filter(survey => survey.feedback_unhappy.includes(8)).length})</b></li>
            <li>- Helping you achieve your personal learning goals <b>({weekShow.filter(survey => survey.feedback_unhappy.includes(9)).length})</b></li>
          </ul>
        </div>
        <h2>All Feedbacks: </h2>
        <div>
          {weekShow.map(survey => <SingleSurvey key={survey._id} survey={survey} />)}
        </div>
      </div>
    )
    }
    else {
      return(
        <div></div>
      )
    }

  }

  handleWeekChange(event: any) {
    let currentFilter: IFilter = window.CS.getBMState().surveyFilter;
    const action: IFilterSurveyAction = {
      type: ActionType.filter_survey,
      filter: {
        weekFilter: event.target.value,
        userFilter: currentFilter.userFilter
      }
    }
    window.CS.clientAction(action);
  }

  handleUserChange(event: any) {
    let currentFilter: IFilter = window.CS.getBMState().surveyFilter;
    const action: IFilterSurveyAction = {
      type: ActionType.filter_survey,
      filter: {
        weekFilter: currentFilter.weekFilter,
        userFilter: event.target.value
      }
    }
    window.CS.clientAction(action);
  }
}