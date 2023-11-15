import puppeteer from "puppeteer"


describe('show/hide an event details', ()=>{
    // scenario 1
    let browser;
    let page;
    beforeAll(async()=>{
        browser = await puppeteer.launch({
            // headless: false, // turned off headless mode
            // slowMo: 250, // slow down by 250ms, 
            // timeout: 0 // removes any puppeteer/browser timeout limitations (this isn't the same as the timeout of jest)
        });
        page = await browser.newPage();
        await page.goto("http://localhost:3000/");
        await page.waitForSelector('.event');
    });
    afterAll(()=>{
        browser.close();
    })
    test('An event element is collapsed by default', async ()=>{
        
        const eventDetails = await page.$('.event .event-details');
        expect(eventDetails).toBeNull();
        
    });
// scenario 2
    test('User can expand an event to see its details', async()=>{
    
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .event-details');
    expect(eventDetails).toBeDefined();
    
    });

    // scenario 3
    test('User can collapse an event to hide details', async()=>{
        await page.click('.event .details-btn');
        const eventDetails = await page.$('.event .event-details');
        expect(eventDetails).toBeNull();
    });
});

describe('Filter events by city', ()=>{
    let browser;
    let page;
    beforeAll(async()=>{
        browser = await puppeteer.launch({
            headless: false, // turned off headless mode
            slowMo: 250, // slow down by 250ms, 
            timeout: 0 // removes any puppeteer/browser timeout limitations (this isn't the same as the timeout of jest)
        });
        page = await browser.newPage();
        await page.goto("http://localhost:3000/");
        await page.waitForSelector('#city-search .city');
    });
    afterAll(()=>{
        browser.close();
    })
    //scenario 1
    test('When user hasn’t searched for a city, show upcoming events from all cities.', async ()=>{
        const eventList = await page.$$eval('.event', (elements)=> elements.length );  // $$eval - retrieve information about elements that match the .event selector
       // counts the number of events, turns into eventCount
        expect(eventList).toBeGreaterThan(0);
    });

    // scenario 2
    test('User should see a list of suggestions when they search for a city.', async ()=>{
        await page.focus('#city-search .city');
        await page.keyboard.type("Berlin, Germany");
        
        const suggestionListItems = await page.$$eval('#city-search .suggestions li', (elements)=> elements.length);
        expect(suggestionListItems).toBeGreaterThan(0);
    });
    //scenario 3
    test('User can select a city from the suggested list.', async ()=>{
        await page.focus("#city-search .city");
        await page.waitForSelector("#city-search .suggestions li");
        await page.click("#city-search .suggestions li");

        const selectedCity = await page.$eval("#city-search .city", (element) => element.value);
          expect(selectedCity).toBe("Berlin, Germany");
        
          const eventList = await page.$$eval(".event", (elements) => elements.length);
          expect(eventList).toBeGreaterThan(0);
    });
})