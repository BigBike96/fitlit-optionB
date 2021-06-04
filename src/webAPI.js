
// GET for users

let getData = (endpoint) => fetch(`http://localhost:3001/api/v1/${endpoint}`)
  .then(response => response.json())
  .catch(err => console.log('error'));
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
export default {retrieveData};




 // User Data	GET	http://localhost:3001/api/v1/users
// Sleep Data	GET	http://localhost:3001/api/v1/sleep
// Activity Data	GET	http://localhost:3001/api/v1/activity
// Hydration Data	GET	http://localhost:3001/api/v1/hydration
