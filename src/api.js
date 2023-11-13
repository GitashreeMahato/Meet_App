import mockData from "./mock-data";

const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};
// to get the access token
const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const response = await fetch(
    'https://1eyrv3ieik.execute-api.eu-central-1.amazonaws.com/dev/api/token' + '/' + encodeCode
  );
  const { access_token } = await response.json();
  access_token && localStorage.setItem("access_token", access_token);

  return access_token;
};

/**
 *
 * @param {*} events:
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */

export const extractLocations = (events) => {
    const extractedLocations = events.map((event) => event.location);
    const locations = [...new Set(extractedLocations)];
    return locations;
  };
//check token's validity
  const checkToken = async (accessToken) => {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );
    const result = await response.json();
    return result;
  };
  
  /**
   *
   * This function will fetch the list of all events
   */
  export const getEvents = async () => {
    if (window.location.href.startsWith('http://localhost')) {
    return mockData;
  };

  // checks for a token
  const token = await getAccessToken();
// if access token is found
  if (token) {
    removeQuery();  // it is used to remove unnecessary query parameters
    const url =  "https://1eyrv3ieik.execute-api.eu-central-1.amazonaws.com/dev/api/get-events" + "/" + token;
    const response = await fetch(url);
    const result = await response.json();
    if (result) {
      return result.events;
    } else return null; 
  }
};

   export const getAccessToken = async()=>{
    const accessToken = localStorage.getItem('access_token');

    // checks whether access token is found or not
    const tokenCheck = accessToken && (await checkToken(accessToken));

// if no token is found checks for authorization code
  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    //if no authorization code, redirects to Google suthorization screen
    if (!code) {
      const response = await fetch(
        "https://1eyrv3ieik.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
      );
      const result = await response.json();
      const { authUrl } = result;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
   };