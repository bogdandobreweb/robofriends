import React, { useState, useEffect } from 'react';
// import Card from '../components/Card';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
// import { render } from '@testing-library/react';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../ErrorBoundry';


function App() {
    // constructor() {
    //     super();
    //     this.state = {
    //         robots: [],
    //         searchfield: ''
    // }
    // }
const [robots, setRobots] = useState([]);
const [searchField, setSearchField] = useState('');

useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response =>
            response.json())
            .then(users => {
                setRobots(users)
            }
               )
},[])

const onSearchChange = (event) => {
        setSearchField(event.target.value )
    }

const filteredRobots = robots.filter(robot => {
    // console.log(robot);
    return robot.name.toLowerCase().includes(searchField.toLowerCase())
})
// console.log(filteredRobots);

    if(!robots.length){
        return <h1 className = 'tc'>Loading .. </h1>
    }
  
    else{
        return (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundry>
                </Scroll>
            </div>

        )
    }} 

export default App;