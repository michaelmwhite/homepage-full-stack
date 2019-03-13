import * as React from 'react';
import './app.scss';
import { Header } from './components/Header';
import { getTopics } from './utils/cookie-util';
import { TopicArray } from './types/TopicArray';
import { TopicObject } from './types/TopicObject';
import { cloneObject } from './utils/helpers';
import { TopicComponent } from './components/TopicComponent';

// Great resource: https://github.com/Lemoncode/react-typescript-samples

interface State {
    topicsList: string[];
    topics: TopicArray;
}
interface Props { }

export default class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            topicsList: getTopics(),
            topics: {}
        }
        this.updateTopicsList = this.updateTopicsList.bind(this);
    }

    componentDidMount() {
        console.log(this.state.topics);
        this.state.topicsList.forEach((topic: string) => {
            fetch('/api/news/search/' + topic)
                .then(response => response.json())
                .then(data => {
                    let newTopics = cloneObject(this.state.topics)
                    if (!newTopics[topic]) {
                        newTopics[topic] = new TopicObject(topic);
                    }
                    newTopics[topic].newsObjects = data.value;
                    this.setState({ ...this.state, topics: newTopics });
                }).catch(error => console.log(error));
            fetch('/api/video/search/' + topic)
                .then(response => response.json())
                .then(data => {
                    let newTopics = cloneObject(this.state.topics)
                    if (!newTopics[topic]) {
                        newTopics[topic] = new TopicObject(topic);
                    }
                    newTopics[topic].videoObjects = data.value;
                    this.setState({ ...this.state, topics: newTopics });
                })
                .catch(error => console.log(error));
        });
    }

    updateTopicsList() {
        console.log("UPDATE TOPICS LIST");
        console.log(getTopics());
        this.setState({ ...this.state, topicsList: getTopics() });
    }

    // NOTE: elements must be returned in {..} statements, foreach returns undefined - map 
    // actually returns things so it should be used instead
    // () => x means that x will be returned, so adding more curly brackets can be redundant and 
    // cause errors; () => {} does not necessarily return anything though - you must do so manually
    render() {
        return (
            <div id="top">
                <Header topicsList={this.state.topicsList}
                    updateTopicsList={this.updateTopicsList} />
                <div className="content">
                    {Object.keys(this.state.topics).map(topic =>
                        <TopicComponent {...this.state.topics[topic]} />
                    )}
                </div>
            </div>
        );
    }
}
