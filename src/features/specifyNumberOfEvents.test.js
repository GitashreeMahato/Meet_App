import { render, waitFor, within } from "@testing-library/react";
import { defineFeature, loadFeature } from "jest-cucumber";
import App from "../App";
import userEvent from "@testing-library/user-event";

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature')
defineFeature(feature, test =>{
    // scenario 1
    test('When user hasn’t specified a number, 32 events are shown by default.', ({ given, when, then }) => {
        given('the user has not specified the number of events', () => {

        });
        let AppComponent;
        let AppDOM;
        when('the user sees the entire list of events', () => {
            AppComponent = render(<App />);
        });

        then('the app will display 32 events by default', async() => {
            AppDOM = AppComponent.container.firstChild;
            const EventDetails = AppDOM.querySelector('#event-list');
            await waitFor(()=>{
                const EventListItems = within(EventDetails).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });
    });

    //scenario 2

    test('User can change the number of events displayed.', ({ given, when, then }) => {
        let AppComponent;
        let AppDOM;
        given('the user has viewed the list of events', async() => {
            AppComponent = render(<App />);
            AppDOM = AppComponent.container.firstChild;
            const EventDetails = AppDOM.querySelector('#event-list');
            await waitFor(()=>{
                const EventListItems = within(EventDetails).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });

        when('the user specifies the number of events they want to see', async() => {
            AppDOM = AppComponent.container.firstChild;
            const NumberOfEventsComponent = AppDOM.querySelector('.textboxNumber');
            await userEvent.type(NumberOfEventsComponent, "{backspace}{backspace}10")
        });

        then('the app should display the number of events specified by the user', () => {
            AppDOM = AppComponent.container.firstChild;
            const EventListDOM = within(AppDOM).queryAllByRole('listitem');
            expect(EventListDOM.length).toEqual(10);
        });
    });
});