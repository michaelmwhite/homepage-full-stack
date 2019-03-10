import { TopicObject } from "../types/TopicObject";
import { NewsComponent } from "./NewsComponent";
import { VideoComponent } from "./VideoComponent";
import * as React from 'react';

export class TopicComponent extends React.Component<TopicObject, any> {
    render() {
        return (
            <div>
                <h1>{this.props.name}</h1>
                {this.props.newsObjects.map(newsObject => <NewsComponent {...newsObject} />)}
                {this.props.videoObjects.map(videoObject => <VideoComponent {...videoObject} />)}
            </div>
        );
    }
}