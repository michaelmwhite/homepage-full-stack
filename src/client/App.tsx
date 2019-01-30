import * as React from 'react';
import './app.css';

export default class App extends React.Component {
    state = {};

    componentDidMount() {
        fetch('/api/search')
            .then(response => response.json())
            .then(data => this.setState({ searchObjects: data.searchData }));
    }

    render() {
        return (
            <div>
                cat
            </div>
        );
    }
}
