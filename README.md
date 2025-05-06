
<div id="header" >
 <h1  class="heading-element" dir="auto">Weather App)<a href="https://fladev-weather.netlify.app/">Visit Here</a></h1>
 <img src="" alt="Five Day Forecast">

</div>

<div id="header" >
 <h1 class="heading-element" dir="auto">How It's Made:</h1>
 Tech used: HTML, Tailwind, JavaScript, React, Vite<br/><br/>
This five-day weather forecast app provide users with accurate weather information based on their exact location. By utilizing the Geolocation API, the app can pinpoint the user's location and fetch a detailed five-day weather forecast using a reliable weather API.
</div>

<div id="header" >
 <h1 class="heading-element" dir="auto">Optimizations:</h1>
  Continue to add variety features  and enhance the user interface to make it more visually appealing. Plan to develop a mobile version of the app using React Native. This will allow users to access the weather forecast on their mobile devices, improving the overall user experience.
</div>
<div id="header" >
 <h1 class="heading-element" dir="auto">Installation:</h1>
 1. git clone repo.<br/>
 2. npm install<br/>
 3. Go to https://console.firebase.google.com/ create an account follow instructions.<br/>
 4. In root folder npm install dotenv in your .env folder keep your firebaseConfig <br/>
  Example:<br/>
  VITE_API_KEY="Your web app's Firebase configuration"
  VITE_API_DOMAIN="Your web app's Firebase configuration"
  VITE_API_PROJECT_ID="Your web app's Firebase configuration"
  VITE_API_BUCKET="Your web app's Firebase configuration"
  VITE_API_SENDER_ID="Your web app's Firebase configuration"
  VITE_API_APP_ID="Your web app's Firebase configuration3"
  VITE_API_MEASURE_ID="Your web app's Firebase configuration"<br/>
  5. npm run dev
</div>

<div id="header">
 <h1 class="heading-element" dir="auto">Lessons Learned:</h1>
  Utilizing useEffect hook to make API calls for fetching weather data. Ensured dependencies are correctly updated to trigger re-renders when necessary.
  Also Implemented conditional rendering to display different UI elements based on the state of the application. These lessons have significantly improved the efficiency and user experience of the weather forecast app.
</div>
