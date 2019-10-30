import React from 'react';
import { IFeedbackData } from '../state/appState';
import { IWindow } from '../framework/IWindow';

declare let window: IWindow;

interface IProps {
  survey: IFeedbackData
}

export default class SingleSurvey extends React.PureComponent<IProps> {

  render() {
    let newArrHappy: string[] = this.props.survey.feedback_happy.map(value => value.toString())
    for (let i = 0; i < newArrHappy.length; i++) {
      if (newArrHappy[i] === "1") { newArrHappy[i] = "Curriculum topics and structure" };
      if (newArrHappy[i] === "2") { newArrHappy[i] = "Curriculum difficulty level" };
      if (newArrHappy[i] === "3") { newArrHappy[i] = "Quality of lessons" };
      if (newArrHappy[i] === "4") { newArrHappy[i] = "Quality of labs (WebDev & Data) and projects (UX/UI)" };
      if (newArrHappy[i] === "5") { newArrHappy[i] = "Teacher technical skills" };
      if (newArrHappy[i] === "6") { newArrHappy[i] = "Teacher teaching ability" };
      if (newArrHappy[i] === "7") { newArrHappy[i] = "Teacher accessibility" };
      if (newArrHappy[i] === "8") { newArrHappy[i] = "Teacher´s Assistant abilities" };
      if (newArrHappy[i] === "9") { newArrHappy[i] = "Helping you achieve your personal learning goals" };
    }

    let newArrImprove: string[] = this.props.survey.feedback_unhappy.map(value => value.toString())
    for (let i = 0; i < newArrImprove.length; i++) {
      if (newArrImprove[i] === "1") { newArrImprove[i] = "Curriculum topics and structure" };
      if (newArrImprove[i] === "2") { newArrImprove[i] = "Curriculum difficulty level" };
      if (newArrImprove[i] === "3") { newArrImprove[i] = "Quality of lessons" };
      if (newArrImprove[i] === "4") { newArrImprove[i] = "Quality of labs (WebDev & Data) and projects (UX/UI)" };
      if (newArrImprove[i] === "5") { newArrImprove[i] = "Teacher technical skills" };
      if (newArrImprove[i] === "6") { newArrImprove[i] = "Teacher teaching ability" };
      if (newArrImprove[i] === "7") { newArrImprove[i] = "Teacher accessibility" };
      if (newArrImprove[i] === "8") { newArrImprove[i] = "Teacher´s Assistant abilities" };
      if (newArrImprove[i] === "9") { newArrImprove[i] = "Helping you achieve your personal learning goals" };
    }

    return (
      <div className="singleSurveyContainer">
        <p><span className="feedbackHead">User: </span>{this.props.survey.submitted_by.username}</p>
        <p><span className="feedbackHead">Week: </span>{this.props.survey.feedback_week}</p>
        <p><span className="feedbackHead">Scale (0-10) how satisfied you are with the Bootcamp:</span> {this.props.survey.feedback_satisfied}</p>
        <p className="feedbackHead">Please pick 3 areas of your learning experience that you think we are doing well (check 3 that apply):</p>
        <ul>{newArrHappy.map((value, i) => <li key={i}>- {value}</li>)}</ul>
        <p className="feedbackHead">Please pick 3 areas of your learning experience that you think we need to improve most (check 3 that apply):</p>
        <ul>{newArrImprove.map((value, i) => <li key={i}>- {value}</li>)}</ul>
        <p><span className="feedbackHead">Comment: </span> {this.props.survey.feedback_comments}</p>
      </div>
    )

  }

}