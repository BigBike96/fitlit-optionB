
// GET for users
fetch('http://localhost:3001/api/v1/users')
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
  // .catch(error => console.log(''));







 // User Data	GET	http://localhost:3001/api/v1/users
// Sleep Data	GET	http://localhost:3001/api/v1/sleep
// Activity Data	GET	http://localhost:3001/api/v1/activity
// Hydration Data	GET	http://localhost:3001/api/v1/hydration
