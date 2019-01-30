import React, { Component } from 'react';
import './app.css';

export default class App extends Component {
    state = { searchObjects: [] };

    componentDidMount() {
      fetch('/api/search')
        .then(response => response.json())
        .then(data => this.setState({ searchObjects: data.searchData }));
    }

    render() {
      const { searchObjects } = this.state;
      console.log(searchObjects);
      return (<div>{searchObjects.map(object => <p>{object.name}</p>)}</div>);
    }
}
