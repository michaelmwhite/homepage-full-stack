import { VideoObject } from "../interfaces/VideoObject";
import * as React from 'react';

export class VideoComponent extends React.Component<VideoObject, any> {
    render() {
        return (
            <div className="video-component">
                <h2>{this.props.name}</h2>
                <img src={this.props.thumbnailUrl}
                    width="180" />
                <p>{this.props.description}</p>
                <p><a href={this.props.contentUrl}>{this.props.contentUrl}</a></p>
            </div>
        );
    }
}