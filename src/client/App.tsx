import * as React from 'react';
import './app.scss';
import { NewsObject } from './interfaces/NewsObject'
import { VideoObject } from './interfaces/VideoObject';
import { NewsComponent } from './components/NewsComponent';
import { VideoComponent } from './components/VideoComponent';
import { Header } from './components/Header';

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
            <div id="top">
                <Header />
                <div className="content">
                    <h1>News:</h1>
                    {this.state.newsObjects
                        .map(newsObject => <NewsComponent {...newsObject} />)}
                    <h1>Videos:</h1>
                    {this.state.videoObjects
                        .map(videoObject => <VideoComponent {...videoObject} />)}
                </div>
            </div>
        );
    }
}
