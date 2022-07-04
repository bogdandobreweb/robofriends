import React, { Component } from 'react';
import Card from '../components/Card';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import { render } from '@testing-library/react';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../ErrorBoundry';



class App extends Component {
    constructor() {
        super();
        this.state = {

            robots: [],
            searchfield: ''

        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response =>
                response.json()).then(users =>
                    this.setState({ robots: users }))
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }
 
    render() {
        const {robots, searchfield} = this.state;
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
        }
        )
    if(!this.state.robots.length){
        return <h1 className = 'tc'>Loading .. </h1>
    }
  
    else{
        return (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange} />
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundry>
                </Scroll>
            </div>

        )
    }} 
}


export default App;