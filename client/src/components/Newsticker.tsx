import React, { Component } from 'react';
import mongoose from 'mongoose';
import { IState, INewsData, INewsType } from '../state/appState';
import { ActionType, IAction } from '../framework/IAction';
import axios from 'axios';
import { reducerFunctions } from '../reducer/appReducer';
import { IWindow } from '../framework/IWindow';
import { INewsLoadedAction } from '../App';
import NewsArticle from './NewsArticle'
declare let window: IWindow;

interface IProps { };

export interface INewsAction extends IAction {
  news: INewsData
}

reducerFunctions[ActionType.add_news] = function (newState: IState, action: INewsAction) {
  newState.BM.news.push(action.news);
  newState.UI.waitingForResponse = false;
  return newState;
}


export default class Newsticker extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    return (
      <div>
        <div>
          {window.CS.getBMState().news.map(news => <NewsArticle key={news._id} news={news} />)}
        </div>
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-25">
                <label htmlFor="lname">Headline</label>
              </div>
              <div className="col-75">
                <input type="text" id="lname" name="lastname" placeholder="Your headline.." />
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="country">Type</label>
              </div>
              <div className="col-75">
                <select id="country" name="country">
                  <option value="solution">Solution</option>
                  <option value="question">Question</option>
                  <option value="note">Note</option>
                  <option value="lab">Lab</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="subject">Content</label>
              </div>
              <div className="col-75">
                <textarea id="subject" name="subject" placeholder="Write something.."></textarea>
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
    const newNews: INewsData = {
      _id: mongoose.Types.ObjectId().toString(),
      news_type: INewsType.solution,
      news_headline: "TestHeadline2",
      news_content: "TestContent2"
    }
    const action: INewsAction = {
      type: ActionType.add_news,
      news: newNews
    }
    axios.post('/news/add', newNews)
      .then(res => {
        window.CS.clientAction(action);
        console.log(res.data)
      });

    event.preventDefault();
  }

}
