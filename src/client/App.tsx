import * as React from 'react';
import './app.css';
import { NewsObject } from './interfaces/NewsObject'

// Great resource: https://github.com/Lemoncode/react-typescript-samples

interface State {
    searchObjects: NewsObject[];
}
interface Props { }

export default class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { searchObjects: [] }
    }

    componentDidMount() {
        fetch('/api/search')
            .then(response => response.json())
            .then(data => this.setState({ searchObjects: data.value }));
    }

    render() {
        return (
            <div>
                {this.state.searchObjects.map(searchObject => <p>{searchObject.name}</p>)}
            </div>
        );
    }
}
