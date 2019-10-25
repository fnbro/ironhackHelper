import React from 'react';
import { INewsData, IState } from '../state/appState';
import logo from '../images/delete-icon.png';
import { ActionType, IAction } from '../framework/IAction';
import { IWindow } from '../framework/IWindow';
import { reducerFunctions } from '../reducer/appReducer';

import axios from 'axios';
import { INewsAction } from './Newsticker';

declare let window: IWindow;

interface IProps {
  news: INewsData
}

reducerFunctions[ActionType.delete_news] = function (newState: IState, deleteAction: INewsAction) {
  let newsToKeep: INewsData[] = newState.BM.allNews.filter(news => news._id !== deleteAction.news._id)
  newState.BM.allNews = newsToKeep;
  return newState;
}

export default class NewsArticle extends React.PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
    this.handleDeleteButton = this.handleDeleteButton.bind(this);
  }

  render() {
    return (
      <div className="newsContainer">
        <div className="headlineContainer">
        <h3>{this.props.news.news_headline}</h3>
        <img onClick={this.handleDeleteButton} id="deleteBtn" src={logo} alt="delete-btn"/>
        </div>
        <p>{this.props.news.news_content}</p>
      </div>

    )
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