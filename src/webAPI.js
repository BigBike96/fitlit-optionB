
// GET for users
let getUsers = () => {
  fetch('http://localhost:3001/api/v1/users')
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
  .catch(error => console.log('ERRORRRRR', error));
}




export default {getUsers};


 // User Data	GET	http://localhost:3001/api/v1/users
// Sleep Data	GET	http://localhost:3001/api/v1/sleep
// Activity Data	GET	http://localhost:3001/api/v1/activity
// Hydration Data	GET	http://localhost:3001/api/v1/hydration
