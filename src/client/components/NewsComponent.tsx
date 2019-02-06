import { NewsObject } from "../interfaces/NewsObject";
import * as React from 'react';
import * as url from 'url';

export class NewsComponent extends React.Component<NewsObject, any> {
    render() {
        return (
            <div className="news-component">
                <h2><a href={this.props.url}>{this.props.name}</a></h2>
                <a href={this.props.url} className="styled-link">
                    {url.parse(this.props.url).hostname}
                </a>
            </div>
        );
    }
}