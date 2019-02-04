import * as React from 'react';
import './app.scss';
import { NewsObject } from './interfaces/NewsObject'
import { VideoObject } from './interfaces/VideoObject';

// Great resource: https://github.com/Lemoncode/react-typescript-samples

interface State {
    newsObjects: NewsObject[];
    videoObjects: VideoObject[];
}
interface Props { }

export default class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            newsObjects: [],
            videoObjects: []
        }
    }

    componentDidMount() {
        fetch('/api/news/search')
            .then(response => response.json())
            .then(data => this.setState({ ...this.state, newsObjects: data.value }));
        fetch('/api/video/search')
            .then(response => response.json())
            .then(data => this.setState({ ...this.state, videoObjects: data.value }));
    }

    render() {
        return (
            <div>
                <h1>News:</h1>
                {this.state.newsObjects
                    .map(newsObject => <p><a href={newsObject.url}>{newsObject.name}</a></p>)}
                <h1>Videos:</h1>
                {this.state.videoObjects
                    .map(videoObjects => <p><a href={videoObjects.contentUrl}>{videoObjects.name}</a></p>)}
            </div>
        );
    }
}
