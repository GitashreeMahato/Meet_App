Feature: Specify Number of Events
    Scenario: When user hasn’t specified a number, 32 events are shown by default.
        Given the user has not specified the number of events
        When the user sees the entire list of events
        Then the app will display 32 events by default

    Scenario: User can change the number of events displayed.
        Given the user has viewed the list of events
        When the user specifies the number of events they want to see
        Then the app should display the number of events specified by the user

