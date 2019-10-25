import React from 'react';
import { INewsData } from '../state/appState';
interface IProps {
  news: INewsData
}

export default class NewsArticle extends React.PureComponent<IProps> {

  render() {
    return (
      <div className="newsContainer">
        <h3>{this.props.news.news_headline}</h3>
        <p>{this.props.news.news_content}</p>
      </div>

    )
  }


}