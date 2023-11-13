
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import './App.css';
import { useEffect, useState } from 'react';
import { getEvents, extractLocations } from './api';

const App = ()=> {
  const [events, setEvents] = useState([]);
  //currentOne represents current no of events
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity]= useState('See all Cities')

  // populating the list when App component is mounted
  useEffect(()=>{
    fetchData();
  }, [currentCity, currentNOE]);
  
  const fetchData = async ()=>{
    const allEvents = await getEvents();
    const filteredEvents = currentCity === 'See all Cities' ? allEvents : allEvents.filter(event => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNOE));  // take the 32 events
    setAllLocations(extractLocations(allEvents));
  }
  

  return (
    <div className="App">
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
      <NumberOfEvents setCurrentNOE={setCurrentNOE} />
      <EventList events={events}/>
    </div>
  );
}

export default App;















































// =========================================

// <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
