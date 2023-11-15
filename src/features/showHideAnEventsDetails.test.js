import { render, waitFor, within } from "@testing-library/react";
import { defineFeature, loadFeature } from "jest-cucumber";
import App from "../App";
import userEvent from "@testing-library/user-event";

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature')
defineFeature(feature, test => {

// scenario 1
    test('An event element is collapsed by default.', ({ given, when, then }) => {
        let AppComponent;
        let AppDOM;
        given('the user opens the application', () => {
            AppComponent = render(<App />);
        });

        when('the list of events loads', async() => {
             AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(()=>{
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
        });
    })
        then('all events will collapse by default', () => {
             AppDOM = AppComponent.container.firstChild;
            const EventDetails = AppDOM.querySelector('#event-details');
            expect(EventDetails).not.toBeInTheDocument();
        });
  
    })
    //scenario 2

    test('User can expand an event to see its details.', ({ given, when, then }) => {
        let AppComponent;
        let AppDOM;
        given('the list of events is displayed', async() => {
            AppComponent = render(<App />); 
            AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(()=>{
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            expect(EventListItems.length).toBe(32);
            })
        });

        when('the user clicks on show details', async() => {
            AppDOM = AppComponent.container.firstChild;
            const showDetailsButton = AppDOM.querySelector('.details-btn');
            const user = userEvent.setup();
            await user.click(showDetailsButton);

        });

        then('the event details will be displayed', () => {
            AppDOM = AppComponent.container.firstChild;
            const EventDetails = AppDOM.querySelector('#event-details');
            expect(EventDetails).toBeInTheDocument();
        });
    });


    // scenario 3

    test('User can collapse an event to hide details.', ({ given, when, then }) => {
        let AppComponent;
        let AppDOM;
        given('event details are displayed for the user', async() => {
             AppComponent = render(<App />);
            AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(()=>{
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            expect(EventListItems.length).toBe(32);
            });
            const showDetailsButton = AppDOM.querySelector('.details-btn');
            await userEvent.click(showDetailsButton);
            const EventDetails = AppDOM.querySelector('#event-details');
            expect(EventDetails).toBeInTheDocument();
        });

        when('the user clicks on hide details',async () => {
            AppDOM = AppComponent.container.firstChild;
            const hideDetailsButton = AppDOM.querySelector('.details-btn');
            await userEvent.click(hideDetailsButton);            

        });

        then('the event details will be hidden', () => {
            AppDOM = AppComponent.container.firstChild;
            const EventDetails = AppDOM.querySelector('#event-details');
            expect(EventDetails).not.toBeInTheDocument();

        });
    });

});