import React from 'react';
import { INewsData, IState, IFeedbackData } from '../state/appState';
import { ActionType, IAction } from '../framework/IAction';
import { IWindow } from '../framework/IWindow';
import { reducerFunctions } from '../reducer/appReducer';

import axios from 'axios';
import { INewsAction } from './Newsticker';

declare let window: IWindow;

interface IProps {
  survey: IFeedbackData
}

export default class SingleSurvey extends React.PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className="singleSurveyContainer">
        {this.props.survey.feedback_comments}
      </div>
    )

  }

}