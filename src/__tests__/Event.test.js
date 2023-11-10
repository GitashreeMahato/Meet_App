import Event from "../components/Event";
import { render , getDefaultNormalizer } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { getEvents } from "../api";
import mockData from "../mock-data";


describe('<Event /> component', ()=>{
    let EventComponent;
    let allEvents;

      beforeEach(async () => {
        allEvents = await getEvents();
        EventComponent = render(<Event event={allEvents[0]} />);
        
      });

      test('renders event location', ()=>{
         
        expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
     });
     
    test('renders event title', ()=>{
    expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
    });

    test('renders event date',  ()=>{
    expect(EventComponent.queryByText(allEvents[0].created)).toBeInTheDocument();
    });


  test("renders event details button with the title (show details)", () => {
    expect(EventComponent.queryByText("show details")).toBeInTheDocument();
    });

  test("by default, event's details section should be hidden",  () => {
        
        EventComponent.rerender(<Event event={allEvents[0]} />);
        const showDetails = EventComponent.queryByText(allEvents[0].description);
        expect(showDetails).not.toBeInTheDocument();
      });


  test("shows the details section when the user clicks on the 'show details' button", async () => {
    const user = userEvent.setup();
    const showDetailsButton = EventComponent.queryByText("show details");
    await user.click(showDetailsButton);
    // await EventComponent.rerender(<Event event={allEvents[0]} />);
    expect(EventComponent.container.querySelector('#event-details')).toBeInTheDocument();
    
  });
  test("hides the details section when the user clicks on the 'hide details' button", async () => {
    const user = userEvent.setup();
    const hideDetailsButton = EventComponent.queryByText("hide details");
    await user.click(hideDetailsButton);
    const eventDescription = EventComponent.queryByText(allEvents[0].description);
    expect(eventDescription).not.toBeInTheDocument();
  });



})
