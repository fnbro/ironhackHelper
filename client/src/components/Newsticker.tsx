import React, { Component } from 'react';
import { IState, INewsData, INewsType } from '../state/appState';
import { ActionType, IAction } from '../framework/IAction';
import axios from 'axios';
import { reducerFunctions } from '../reducer/appReducer';
import { IWindow } from '../framework/IWindow';
import { INewsLoadedAction } from '../App';
import NewsArticle from './NewsArticle';
import { IErrorMessage } from './Register';
declare let window: IWindow;

interface IProps { };

export interface INewsAction extends IAction {
  news: INewsData
}

// POST ERROR
reducerFunctions[ActionType.news_error] = function (newState: IState, action: IErrorMessage) {
  newState.UI.waitingForResponse = false;
  newState.UI.News.errorMessageNews = action.errorMessage;
  return newState
}

// READ ALL NEWS
reducerFunctions[ActionType.add_news_from_server] = function (newState: IState, action: INewsLoadedAction) {
  newState.UI.waitingForResponse = false;
  newState.BM.allNews = action.news;
  newState.UI.News.errorMessageNews = "";
  return newState
}

// CREATE NEW NEWS
reducerFunctions[ActionType.create_news] = function (newState: IState, updateAction: INewsAction) {
  newState.BM.allNews.push(updateAction.news);
  newState.UI.waitingForResponse = false;
  newState.UI.News.errorMessageNews = "";
  newState.BM.news.news_content = "";
  newState.BM.news.news_headline = "";
  newState.BM.news.news_type = INewsType.none;
  return newState
}


export default class Newsticker extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleHeadlineChange = this.handleHeadlineChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
  }

  componentDidMount() {
    // Get all News from Database
    axios.get('/news/read').then(response => {
      const responseAction: INewsLoadedAction = {
        type: ActionType.add_news_from_server,
        news: response.data as INewsData[]
      }
      console.log(responseAction.news);
      window.CS.clientAction(responseAction);
    }).catch(function (error) { console.log(error); })
  }

  render() {
    console.log(window.CS.getBMState().allNews)
    return (
      <div>
        <div className="sectionNews">
          {window.CS.getBMState().allNews.map(news => <NewsArticle key={news._id} news={news} />)}
        </div>
        <div className="inputContainer">
          <form onSubmit={this.handleSubmit}>
            <div>
              <p className="errorMessageNews">{window.CS.getUIState().News.errorMessageNews}</p>
              <div className="row">
                <div className="col-25">
                  <label className="news-label" htmlFor="headline">Headline</label>
                </div>
                <div className="col-75">
                  <input onChange={this.handleHeadlineChange} value={window.CS.getBMState().news.news_headline} type="text" id="lname" name="headline" placeholder="Your headline.." />
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label className="news-label" htmlFor="type">Type</label>
                </div>
                <div className="col-75 select">
                  <select value={window.CS.getBMState().news.news_type} onChange={this.handleTypeChange} id="newsType" name="type">
                    <option value="none">none</option>
                    <option value="solution">Solution</option>
                    <option value="question">Question</option>
                    <option value="note">Note</option>
                    <option value="lab">Lab</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label className="news-label" htmlFor="content">Content</label>
                </div>
                <div className="col-75">
                  <textarea onChange={this.handleContentChange} value={window.CS.getBMState().news.news_content} id="subject" name="content" placeholder="Write something.."></textarea>
                </div>
              </div>
            </div>
            <div className="row button-col">
              <input id="submitNews" type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    )
  }

  handleSubmit(event: any) {
    const uiAction: IAction = {
      type: ActionType.server_called
    }
    window.CS.clientAction(uiAction);

    if (window.CS.getBMState().news.news_headline.length === 0) {
      const uiAction: IErrorMessage = {
        type: ActionType.news_error,
        errorMessage: "Please enter a headline!"
      }
      window.CS.clientAction(uiAction);
    }
    else if (window.CS.getBMState().news.news_headline.length > 80) {
      const uiAction: IErrorMessage = {
        type: ActionType.news_error,
        errorMessage: "Please enter a valid headline with max 80 characters!"
      }
      window.CS.clientAction(uiAction);
    }
    else if (window.CS.getBMState().news.news_content.length === 0) {
      const uiAction: IErrorMessage = {
        type: ActionType.news_error,
        errorMessage: "Please enter some content!"
      }
      window.CS.clientAction(uiAction);
    }
    else {
      axios.post('/news/add', window.CS.getBMState().news)
        .then(res => {
          const action: INewsAction = {
            type: ActionType.create_news,
            news: res.data
          }
          window.CS.clientAction(action);
        });
    }
    event.preventDefault();
  }

  handleHeadlineChange(event: any) {
    let currentNews = window.CS.getBMState().news;
    currentNews.news_headline = event.target.value;
    const action: INewsAction = {
      type: ActionType.update_news,
      news: currentNews
    }
    window.CS.clientAction(action);

    if (currentNews.news_headline.length > 80) {
      const uiAction: IErrorMessage = {
        type: ActionType.news_error,
        errorMessage: "Please enter a valid headline with max 80 characters!"
      }
      window.CS.clientAction(uiAction);
    }

    else if (currentNews.news_headline.length < 80) {
      const uiAction: IErrorMessage = {
        type: ActionType.news_error,
        errorMessage: ""
      }
      window.CS.clientAction(uiAction);
    }

  }

  handleTypeChange(event: any) {
    let currentNews = window.CS.getBMState().news;
    currentNews.news_type = event.target.value;
    const action: INewsAction = {
      type: ActionType.update_news,
      news: currentNews
    }
    window.CS.clientAction(action);
  }

  handleContentChange(event: any) {
    let currentNews = window.CS.getBMState().news;
    currentNews.news_content = event.target.value;
    const action: INewsAction = {
      type: ActionType.update_news,
      news: currentNews
    }
    window.CS.clientAction(action);
  }




}
