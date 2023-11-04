# Meet_App
## Objective
To build a serverless, progressive web application (PWA) with React using a test-driven development (TDD) technique. The application uses the Google Calendar API to fetch upcoming events.

### Description

Merging serverless computing and PWAs paves the way for modern web development, with perks like:

 - **Serverless Advantages**: 

    - Backend-free upkeep
    - Elastic scalability
    - Optimal availability
    - Economical

- **PWA Advantages**: 

- Immediate load times
- Offline accessibility
- Push alerts
- Fluid design
- Universal platform support

  
The Meet app is built using React on the frontend, and AWS Lambda on the backend. It displays a list of events, which fetches the events from Google Calendar API, that can be filtered by city or number of events.

## Getting Started

## Features, User Stories, Scenarios, and Acceptance Criteria

**FEATURE 1: FILTER EVENTS BY CITY**

As a user, I should be able to filter events by city. So that I can see a list of events taking place in that city.

- **Scenario 1:** When the user hasn’t searched for a specific city, show upcoming events from all cities.
  - **Given** the main page with the search option has been opened;
  - **When** the user entered a city;
  - **Then** they should be shown upcoming events for that city.

- **Scenario 2:** Users should see a list of suggestions when they search for a city.

  - **Given** the main page with the search option has been opened;
  - **When** the user opens the app;
  - **Then** they should be shown a list of all events for all the cities available.

- **Scenario 3:** User can select a city from the suggested list.
  
  - **Given** user was typing "Berlin" in the city textbox _AND_ the list of suggested cities is showing,
  - **When** the user selects a city (e.g., "Berlin, Germany") from the list;
  - **Then** their city should be changed to that city (i.e., "Berlin, Germany") _AND_ the user should receive a list of upcoming events in that city.

**FEATURE 2: SHOW/HIDE AN EVENT'S DETAILS**

As a user, I should be able to show and hide details about an event by toggling a button.

- **Scenario 1:** An event is only showing a little bit of information by default.
  - **Given** the user first opens the app
  - **When**  a user clicks show more details button on the event;
  - **Then** the event will expand and the user should see the rest of the information.
- **Scenario 2:** User has clicked show details and now wants to show fewer details to scroll quicker.
  - **Given** the user is viewed a list of events,
  - **When** the user clicks on the "Show Details" button of an event
  - **Then** the detailed information about the event should be displayed 
- **Scenario 3:** User can collapse an event to hide its details
  - **Given** the user has expanded an event to view its details
  - **When** the user clicks on the "Hide Details" button of the event
  - **Then** the event details should be hidden again

**FEATURE 3: SPECIFY NUMBER OF EVENTS**

As a user, I should be able to specify the number of events I want to view in the app so that I can see more or fewer events in the events list at once.

- **Scenario 1:** When a user first loads into the app and hasn’t set several events to display.
  - **Given** the user hasn't specified or filtered the number of events;
  - **When** the user sees the list of events
  - **Then** the default number of displayed events will be 10.
 
- **Scenario 2:** When a user wants to change the events shown to a higher number of events.
  - **Given** the default of 10 events is displayed to the user.
  - **When** the user chooses to change the number of events displayed to the default,
  - **then** the page updates the list and new events are displayed to the user.
    
- **Scenario 2:** when a user wants to change the events to show less than the default number of events.
  - **Given** the app is loaded and events are displayed to the user;
  - **When** the user specifies a lower number of events to be shown;
  - **Then** the page updates with a shorter list of events being displayed as specified.

**FEATURE 4: USE THE APP WHEN OFFLINE**

As a user, I should be able to use the app when offline so that I can see the events I viewed the last time I was online.

- **Scenario 1:** Show cached data when there's no internet connection.
  - **Given** the user has no internet connection;
  - **When** the user is accessing the app;
  - **Then** the events will still show up to the user since they’re cached.
- **Scenario 2:** Show error when the user changes the settings (city, time range).
  - **Given** the user has no internet connection;
  - **When** the user is trying to access new event information (change the city, etc.);
  - **Then** the app will show an error.

**FEATURE 5: ADD AN APP SHORTCUT TO THE HOME SCREEN**

As a user, I should be able to add the app shortcut to my home screen so that I can open the app faster.

- **Scenario 1:** User can install the meet app as a shortcut on their device home screen.
  - **Given** the user is on the homepage of the app;
  - **When** the user chooses to add the app to the home screen;
  - **Then** a shortcut of the app should be added to the user device's home screen 

**FEATURE 6: DISPLAY CHARTS VISUALIZING EVENT DETAILS**

As a user, I would like to be able to see a chart showing the upcoming events in each city so that I know what events are organized in which city

- **Scenario 1:** Show a chart with the number of upcoming events in each city.
  - **Given** the user is on the events detail page;
  - **When** the user clicks the button to see a chart of those events in all the cities as a comparison;
  - **Then** a chart with the number of upcoming events for every city, will be shown to the user.

**USE OF SERVERLESS FUNCTION IN THE MEET APP**

- Anytime this app interacts with the Google Calendar API, it will have to use serverless functions to serve the necessary data to the user. An example would be if the user wants to filter events it would trigger serverless functions to interact with the API to display the data their requesting. Another example would be when a user wants to see the data from the API being displayed on a chart. This would also cause serverless functions to occur resulting in the data being fetched and displayed on the graph.

## Project Link

### Live Demo <a name="live-demo"></a>

- [Live Demo Link](https://gitashreemahato.github.io/Meet_App/)

 ### Repository link

- GitHub: [@gitashreemahato](https://github.com/GitashreeMahato/Meet_App)
- Website: 

### Tech Stack

- React
- Jest
- React testing library
- Puppeteer

## Development Environment

Run `npm run start` for a dev server. Navigate to `http://localhost:3000/`. The application will automatically reload if you change any of the source files.

### Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Deployment

Run `npm run deploy` to deploy to github pages


<p align="right">(<a href="#readme-top">back to top</a>)</p>
