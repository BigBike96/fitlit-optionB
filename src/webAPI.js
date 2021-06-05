
// GET for users

let getData = (endpoint) => fetch(`http://localhost:3001/api/v1/${endpoint}`)
  .then(response => response.json())
  .catch(err => console.log('error', err));
// let userData = () => fetch("http://localhost:3001/api/v1/users")
//   .then(response => response.json())
//   .catch(err => console.log('error'));
//
// let hydrationData = () => fetch("http://localhost:3001/api/v1/hydration")
//   .then(response => response.json())
//   .catch(err => console.log('error'));
// let sleepData = () => fetch("http://localhost:3001/api/v1/sleep")
//   .then(response => response.json())
//   .catch(err => console.log('error'));
// let activityData = () => fetch("http://localhost:3001/api/v1/activity")
//   .then(response => response.json())
//   .catch(err => console.log('error'));
function retrieveData() {
  return Promise.all([getData('users'), getData('hydration'), getData('sleep'), getData('activity')])
}

//start writing the post requests!

/*
http://localhost:3001/api/v1/sleep {"userID": integer, "date": string, "hoursSlept": integer, "sleepQuality": integer}

*/

// we need to pass in the array.length-1 as a the userId. We need to take in the date as a string. And have two
//inputs for the hoursSlept, as the sleepQuality......

//http://localhost:3001/api/v1/activity 
//{"userID": integer, "date": string, "numSteps": integer, "minutesActive": integer, "flightsOfStairs": integer}

//let exampleObj = {"userID": integer, "date": string, "hoursSlept": integer, "sleepQuality": integer}
//let sleep1 = {"userID": 47, "date": "March/09/2020", "hoursSlept": 7, "sleepQuality": 1.5}
//let activity1 = {"userID": 7, "date": "Jun/05/2021", "numSteps": 8008, "minutesActive": 350, "flightsOfStairs": 22}

let sendData = (sentData, url) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(sentData), // remember how HTTP can only send and receive strings, just like localStorage?
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(json => console.log("This is the Json post being sent from the API FILE", json))
    .catch(err => console.log(err));
}

let postData = (postableData, urlEndpoint) => {
  return Promise.all([sendData(postableData, `http://localhost:3001/api/v1/${urlEndpoint}`)]);
}

export default {retrieveData, postData};

 // User Data	GET	http://localhost:3001/api/v1/users
// Sleep Data	GET	http://localhost:3001/api/v1/sleep
// Activity Data	GET	http://localhost:3001/api/v1/activity
// Hydration Data	GET	http://localhost:3001/api/v1/hydration
