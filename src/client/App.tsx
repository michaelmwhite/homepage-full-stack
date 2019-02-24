import * as React from 'react';
import './app.scss';
import { Header } from './components/Header';
import { getTopics } from './utils/cookie-util';
import { TopicArray } from './types/TopicArray';
import { TopicObject } from './types/TopicObject';
import { NewsComponent } from './components/NewsComponent';
import { cloneObject } from './utils/helpers';

// Great resource: https://github.com/Lemoncode/react-typescript-samples

interface State {
    topics: TopicArray
}
interface Props { }

export default class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            topics: {}
        }
    }

    // todo: handle error if response is undefined
    componentDidMount() {
        const topicsList = getTopics();
        topicsList.forEach((topic: string) => {
            fetch('/api/news/search/' + topic)
                .then(response => response.json())
                .then(data => {
                    let newTopics = cloneObject(this.state.topics)
                    newTopics[topic] = new TopicObject();
                    newTopics[topic].newsObjects = data.value;
                    this.setState({ topics: newTopics });
                }).catch(error => console.log(error));
            /*fetch('/api/video/search/' + topic)
                .then(response => response.json())
                .then(data => this.setState({ ...this.state, videoObjects: data.value }));*/
        });
    }

    // NOTE: elements must be returned in {..} statements, foreach returns undefined - map 
    // actually returns things so it should be used instead
    // () => x means that x will be returned, so adding more curly brackets can be redundant and 
    // cause errors; () => {} does not necessarily return anything though - you must do so manually
    render() {
        return (
            <div id="top">
                <Header />
                <div className="content">
                    <h1>News:</h1>
                    {Object.keys(this.state.topics)
                        .map(topic => this.state.topics[topic].newsObjects
                            .map(newsObject => <NewsComponent {...newsObject} />))}
                </div>
            </div>
        );
    }
}
