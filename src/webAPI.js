let getData = (endpoint) => fetch(`http://localhost:3001/api/v1/${endpoint}`)
  .then(response => response.json())
  .catch(err => console.log('error', err));

function retrieveData() {
  return Promise.all([getData('users'), getData('hydration'), getData('sleep'), getData('activity')])
}

let sendData = (sentData, url) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(sentData),
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