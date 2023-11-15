Feature: Show/Hide an event details
    Scenario: An event element is collapsed by default.
        Given the user opens the application
        When the list of events loads
        Then all events will collapse by default

    Scenario: User can expand an event to see its details.
        Given the list of events is displayed
        When the user clicks on show details
        Then the event details will be displayed

    Scenario: User can collapse an event to hide details.
        Given event details are displayed for the user
        When the user clicks on hide details
        Then the event details will be hidden
