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
    topics: TopicArray;
}
interface Props { }

export default class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            topics: {}
        }
        this.updateTopicsList = this.updateTopicsList.bind(this);
    }

    componentDidMount() {
        this.updateTopicsList();
    }

    updateTopicsList() {
        let topicsList = getTopics();
        let promiseList: Promise<void>[] = [];
        let newTopics: TopicArray = {};
        topicsList.forEach((topic: string) => {
            promiseList.push(
                fetch('/api/news/search/' + topic)
                    .then(response => response.json())
                    .then(data => {
                        if (!newTopics[topic]) {
                            newTopics[topic] = new TopicObject(topic);
                        }
                        newTopics[topic].newsObjects = data.value;
                    }).catch(error => console.log(error))
            );
            promiseList.push(
                fetch('/api/video/search/' + topic)
                    .then(response => response.json())
                    .then(data => {
                        if (!newTopics[topic]) {
                            newTopics[topic] = new TopicObject(topic);
                        }
                        newTopics[topic].videoObjects = data.value;
                    }).catch(error => console.log(error))
            );
        });
        Promise.all(promiseList).then(() => this.setState({ topics: newTopics }));
    }

    // NOTE: elements must be returned in {..} statements, foreach returns undefined - map 
    // actually returns things so it should be used instead
    // () => x means that x will be returned, so adding more curly brackets can be redundant and 
    // cause errors; () => {} does not necessarily return anything though - you must do so manually
    render() {
        return (
            <div id="top">
                <Header topicsList={Object.keys(this.state.topics)}
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
