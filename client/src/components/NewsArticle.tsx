import React from 'react';
import { INewsData, IState } from '../state/appState';
import logo from '../images/delete-icon.png';
import { ActionType, IAction } from '../framework/IAction';
import { IWindow } from '../framework/IWindow';
import { reducerFunctions } from '../reducer/appReducer';

// icons
import solution from '../images/solutions-icon.png';
import lab from '../images/lab-icon.png';
import note from '../images/note-icon.png';
import none from '../images/none-icon.png';
import question from '../images/question-icon.png';

import axios from 'axios';
import { INewsAction } from './Newsticker';

declare let window: IWindow;

interface IProps {
  news: INewsData
}

reducerFunctions[ActionType.delete_news] = function (newState: IState, deleteAction: INewsAction) {
  let newsToKeep: INewsData[] = newState.BM.allNews.filter(news => news._id !== deleteAction.news._id)
  newState.BM.allNews = newsToKeep;
  newState.UI.News.errorMessageNews = "";
  return newState;
}

export default class NewsArticle extends React.PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
    this.handleDeleteButton = this.handleDeleteButton.bind(this);
  }

  render() {
    let icon;

    if (this.props.news.news_type === "none") {
      icon = none
    }
    else if (this.props.news.news_type === "solution") {
      icon = solution
    }
    else if (this.props.news.news_type === "question") {
      icon = question
    }
    else if (this.props.news.news_type === "note") {
      icon = note
    }
    else if (this.props.news.news_type === "lab") {
      icon = lab
    }

    if (window.CS.getUIState().currentUser.isMember) {
      return (
        <div className="newsContainer">
          <img className="newsIcon" src={icon} alt="icon" />
          <div>
            <div className="headlineContainer">
              <h3 className="headline">{this.props.news.news_headline}</h3>
            </div>
            <p>{this.props.news.news_content}</p>
            <i id="createdBy">created by: {this.props.news.created_by}</i>
          </div>
        </div>
      )
    }
    else if (window.CS.getUIState().currentUser.isAdmin) {
      return (
        <div className="newsContainer">
          <img className="newsIcon" src={icon} alt="icon" />
          <div>
            <div className="headlineContainer">
              <h3 className="headline">{this.props.news.news_headline}</h3>
              <img onClick={this.handleDeleteButton} id="deleteBtn" src={logo} alt="delete-btn" />
            </div>
            <p>{this.props.news.news_content}</p>
            <i id="createdBy">created by: {this.props.news.created_by}</i>
          </div>
        </div>
      )
    }
    else {
      return (
        <div></div>
      )
    }

  }

  handleDeleteButton(event: any) {
    const uiAction: IAction = {
      type: ActionType.server_called
    }
    window.CS.clientAction(uiAction);
    axios.post('/news/delete/' + this.props.news._id)
      .then(res => {
        const action: INewsAction = {
          type: ActionType.delete_news,
          news: this.props.news
        }
        window.CS.clientAction(action)
      });
  }

}