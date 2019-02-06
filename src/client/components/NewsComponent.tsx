import { NewsObject } from "../interfaces/NewsObject";
import * as React from 'react';

export class NewsComponent extends React.Component<NewsObject, any> {
    render() {
        return (
            <div className="news-component">
                <h2>{this.props.name}</h2>
                <p>{this.props.description}</p>
                <p><a href={this.props.url}>{this.props.url}</a></p>
            </div>
        );
    }
}