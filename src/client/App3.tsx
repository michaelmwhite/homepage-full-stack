import * as React from 'react';
import './app.css';
import { NewsObject } from './interfaces/NewsObject'

export default class App extends React.Component {
    state = { searchObjects: [] };

    componentDidMount() {
        fetch('/api/search')
            .then(response => response.json())
            .then(data => this.setState({ searchObjects: data.searchData }));
    }

    render() {
        const { searchObjects } = this.state;
        console.log(searchObjects);
        return (
            <div>
                {searchObjects.map(object => <p>{(object as NewsObject).name} </p>)}
            </div>
        );
    }
}
