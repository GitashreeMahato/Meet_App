
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import CityEventChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart';
import './App.css';
import { useEffect, useState } from 'react';
import { getEvents, extractLocations } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';

const App = ()=> {
  const [events, setEvents] = useState([]);
  //currentOne represents current no of events
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity]= useState('See all Cities');
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  // populating the list when App component is mounted
  useEffect(()=>{
    fetchData();
    if(navigator.onLine){
      setWarningAlert("");
    }else{
      setWarningAlert("You are currently in offline mode, only data is available for you from the cache.")
    }
  }, [currentCity, currentNOE]);
  
  const fetchData = async ()=>{
    const allEvents = await getEvents();
    const filteredEvents = currentCity === 'See all Cities' ? allEvents : allEvents.filter(event => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNOE));  // take the 32 events
    setAllLocations(extractLocations(allEvents));
  }
  

  return (
    <div className="App " >
       <div className='meet-app-bg'>
       <div>
         <h1>Meet App</h1>
         {/* <p className='site-title'>where ideas ignite</p> */}
         
         {/* <a href='https://gitashreemahato.github.io/Meet_App/'>
           <img src={logo} className='meet-app-logo' alt='meet-app-logo'width={200} height={80} />
         </a> */}
       </div>

       <div className="alerts-container">
         {infoAlert.length ? <InfoAlert text={infoAlert}/> : null}
         {errorAlert.length ? <ErrorAlert text={errorAlert}/> : null}
         {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
       </div>
       
       <CitySearch 
       allLocations={allLocations} 
       setCurrentCity={setCurrentCity}
       setInfoAlert={setInfoAlert}
        />
       <NumberOfEvents setCurrentNOE={setCurrentNOE} setErrorAlert ={setErrorAlert} />
      <div className='charts-container'>
        <EventGenresChart events={events} />
        <CityEventChart allLocations={allLocations} events={events} />
    </div>
    </div>
    
       <div >
        <EventList events={events}/>
       </div>
      
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
