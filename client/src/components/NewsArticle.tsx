import React from 'react';
import { INewsData } from '../state/appState';
interface IProps {
  news: INewsData
}

export default class NewsArticle extends React.PureComponent<IProps> {

  render() {
    return (
      <div>
        <p>{this.props.news.news_headline}</p>
        <p>{this.props.news.news_content}</p>
        <p>{this.props.news.news_type}</p>
      </div>

    )
  }


}