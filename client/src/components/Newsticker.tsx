import React, { Component } from 'react';
import mongoose from 'mongoose';
import { IState, INewsData, INewsType } from '../state/appState';
import { ActionType, IAction } from '../framework/IAction';
import axios from 'axios';
import { reducerFunctions } from '../reducer/appReducer';
import { IWindow } from '../framework/IWindow';
import { INewsLoadedAction } from '../App';
import NewsArticle from './NewsArticle';
declare let window: IWindow;

interface IProps { };

export interface INewsAction extends IAction {
  news: INewsData
}

// READ ALL NEWS
reducerFunctions[ActionType.add_news_from_server] = function (newState: IState, action: INewsLoadedAction) {
  newState.UI.waitingForResponse = false;
  return newState;
}

// CREATE NEW NEWS
reducerFunctions[ActionType.create_news] = function (newState: IState, updateAction: INewsAction) {
  console.log(updateAction.news);
  newState.UI.waitingForResponse = false;
  return newState
}

// UPDATE NEWS
reducerFunctions[ActionType.update_user] = function (newState: IState, updateAction: INewsAction) {
  console.log(updateAction.news);
  newState.BM.news = updateAction.news;
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
        news: response.data as INewsData
      }
      console.log(responseAction.news);
      window.CS.clientAction(responseAction);
    }).catch(function (error) { console.log(error); })
  }

  render() {
    return (
      <div>
        <div>
          {/* {window.CS.getBMState().news.map(news => <NewsArticle key={news._id} news={news} />)} */}
        </div>
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-25">
                <label htmlFor="headline">Headline</label>
              </div>
              <div className="col-75">
                <input onChange={this.handleHeadlineChange} type="text" id="lname" name="headline" placeholder="Your headline.." />
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="type">Type</label>
              </div>
              <div className="col-75">
                <select onChange={this.handleTypeChange} id="country" name="type">
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
                <label htmlFor="content">Content</label>
              </div>
              <div className="col-75">
                <textarea onChange={this.handleContentChange} id="subject" name="content" placeholder="Write something.."></textarea>
              </div>
            </div>
            <div className="row">
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    )
  }

  handleSubmit(event: any) {
    axios.post('/news/add', window.CS.getBMState().news)
      .then(res => {
        const action: IAction = {
          type: ActionType.create_news
        }
        window.CS.clientAction(action);
        console.log(res.data)
      });

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
