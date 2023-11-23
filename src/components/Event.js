import { useState } from 'react';
// import { getEvents } from "../api";
// import 'animate.css';

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className='event'>
      {/* <li > */}
        <h2 className='summary'>{event.summary}</h2>
        <p className='created'>{event && new Date(event.start.dateTime).toUTCString()}</p>
        <p className='location'>{`@${event.summary} | ${event.location}`}</p>
      {showDetails ? (<div 
      id='event-details' 
      className="event-details des-info animate__animated animate__fadeIn">
        {event.description}
        </div>) : null}
  
   
    <button
          data-testid='details-btn'
          onClick={toggleDetails}
          className='hide-details details-btn'
        > {showDetails ? 'hide details' : 'show details' }
        </button>
        
      
    </div>
  );
};

// export const formatDate = (isoDate) => {
//   const options = {
//     weekday: 'long',
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//     hour: '2-digit',
//     minute: '2-digit'
//   };
//   const formattedDate = new Date(isoDate).toLocaleDateString('en-US', options);
//   return formattedDate;
// };

export default Event;