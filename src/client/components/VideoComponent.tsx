import { VideoObject } from "../interfaces/VideoObject";
import * as React from 'react';
import * as url from 'url';

export class VideoComponent extends React.Component<VideoObject, any> {
    render() {
        return (
            <div className="video-component">
                <div className="thumbnail-container">
                    <a href={this.props.contentUrl}>
                        <img src={this.props.thumbnailUrl} />
                    </a>
                </div>
                <div className="video-info">
                    <a href={this.props.contentUrl}>
                        <h2>{this.props.name}</h2>
                    </a>
                    <a href={this.props.contentUrl} className="styled-link">
                        {url.parse(this.props.contentUrl).hostname}
                    </a>
                </div>
            </div>
        );
    }
}