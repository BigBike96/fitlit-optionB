/* eslint-disable max-len */
import './css/styles.scss';
import './images/the-rock.jpg'
import './images/person-walking-on-path.jpg'
import apiCalls from './webAPI';

// hard data
// import userData from './data/users';
// import hydrationData from './data/hydration';
// import sleepData from './data/sleep';
// import activityData from './data/activity';

// classes
import User from './classes/User';
import Activity from './classes/Activity';
import Hydration from './classes/Hydration';
import Sleep from './classes/Sleep';
import UserRepo from './classes//User-repo';

// querySelectors
const sidebarName = document.getElementById('sidebarName');



const stepGoalCard = document.getElementById('stepGoalCard');

const headerText = document.getElementById('headerText');

const userAddress = document.getElementById('userAddress');

const userEmail = document.getElementById('userEmail');

const userStridelength = document.getElementById('userStridelength');



const friendList = document.getElementById('friendList');

const historicalWeek = document.querySelectorAll('.historicalWeek');
const friendChallengeListToday = document.getElementById('friendChallengeListToday');

const friendChallengeListHistory = document.getElementById('friendChallengeListHistory');

const bigWinner = document.getElementById('bigWinner');

const streakList = document.getElementById('streakList');

const streakListMinutes = document.getElementById('streakListMinutes')

const hydrationTodayCard = document.querySelector('#hydrationTodayCard');
const hydrationHistoryCard = document.querySelector('#hydrationHistoryCard');
const activityTodayCard = document.querySelector('#activityTodayCard');
const activityHistoryCard = document.querySelector('#activityHistoryCard');
const sleepTodayCard = document.querySelector('#sleepTodayCard');
const sleepHistoryCard = document.querySelector('#sleepHistoryCard');

// start application 
window.onload = () => {
  apiCalls.retrieveData()
    .then((promise) => {
      let userData = promise[0].userData.map((user) => new User(user))
      let userRepo = new UserRepo(userData)
      let hydrationData = new Hydration(promise[1].hydrationData)
      let sleepData = new Sleep(promise[2].sleepData).sleepData
      let activityData = new Activity (promise[3].activityData)
      startApp(userData, userRepo, hydrationData, sleepData, activityData);
    }) 

}

function startApp(userData, userRepo, hydration, sleepData, activityData) {
  let hydrationData = hydration.hydrationData
  let currentUser = findRandomUser(getRandomNum(userData), userRepo);
  let currentUserID = currentUser.id
  let currentDate = findCurrentDate(userRepo, currentUser, hydrationData)[0].date;
  let randomDate = getRandomDate(findCurrentDate(userRepo, currentUser, hydrationData));
  addInfoToSidebar(currentUser, userRepo);
  addHydrationInfo(currentUserID, hydration, currentDate, userRepo, randomDate);

  // addSleepInfo(currentUser, sleepData, currentUser, userRepo, randomDate);
  //   let winnerNow = makeWinnerID(activityRepo, userNow, today, userRepo);

//   addActivityInfo(currentUser, activityRepo, today, userRepo, randomDate, userNow, winnerNow);
//   addFriendGameInfo(currentUser, activityRepo, userRepo, today, randomDate, userNow);
}

function getRandomNum(input) {
  return Math.floor(Math.random() * input.length);
}

function findRandomUser(id, users) {

  return users.getDataFromID(id);


}

function findCurrentDate(users, currentUser, dataSet) {
  return users.makeSortedUserArray(currentUser.id, dataSet);

}

function getRandomDate(date) {
  return date[Math.floor(Math.random() * date.length + 1)].date
}

function makeWinnerID(activityInfo, user, dateString, userStorage) {

  return activityInfo.getWinnerId(user, dateString, userStorage)

}




// maybe script maybe dom
function makeFriendHTML(user, userStorage) {
  return user.getFriendsNames(userStorage).map(friendName => `<li class='historical-list-listItem'>${friendName}</li>`).join('');
}

function makeHydrationHTML(id, hydrationInfo, userStorage, method) {

  return method.map(drinkData => `<li class="historical-list-listItem">On ${drinkData}oz</li>`).join('');
}

function makeSleepHTML(id, sleepInfo, userStorage, method) {

  return method.map(sleepData => `<li class="historical-list-listItem">On ${sleepData} hours</li>`).join('');
}

function makeSleepQualityHTML(id, sleepInfo, userStorage, method) {

  return method.map(sleepQualityData => `<li class="historical-list-listItem">On ${sleepQualityData}/5 quality of sleep</li>`).join('');
}

function makeStepsHTML(id, activityInfo, userStorage, method) {

  return method.map(activityData => `<li class="historical-list-listItem">On ${activityData} steps</li>`).join('');
}

function makeStairsHTML(id, activityInfo, userStorage, method) {

  return method.map(data => `<li class="historical-list-listItem">On ${data} flights</li>`).join('');
}

function makeMinutesHTML(id, activityInfo, userStorage, method) {

  return method.map(data => `<li class="historical-list-listItem">On ${data} minutes</li>`).join('');
}

function makeFriendChallengeHTML(id, activityInfo, userStorage, method) {

  return method.map(friendChallengeData => `<li class="historical-list-listItem">Your friend ${friendChallengeData} average steps.</li>`).join('');
}

function makeStepStreakHTML(id, activityInfo, userStorage, method) {

  return method.map(streakData => `<li class="historical-list-listItem">${streakData}!</li>`).join('');
}


// dom related functions
function addInfoToSidebar(user, userStorage) {

  sidebarName.innerText = user.name;

  headerText.innerText = `${user.getFirstName()}'s Activity Tracker`;
  stepGoalCard.innerText = `Your daily step goal is ${user.dailyStepGoal}.`
  userAddress.innerText = user.address;
  userEmail.innerText = user.email;
  userStridelength.innerText = `Your stridelength is ${user.strideLength} meters.`;



  friendList.insertAdjacentHTML('afterBegin', makeFriendHTML(user, userStorage))
}

function addHydrationInfo(id, hydrationData, dateString, userStorage, laterDateString) {
  const currentData = hydrationData[id]
  console.log(currentData)
  hydrationTodayCard.insertAdjacentHTML('afterBegin', `<article class="card hydration-card">
    <p>You drank</p><p><span class="number">${hydrationData.calculateDailyOunces(id, dateString)}</span></p><p>oz water today.</p>
  </article>
  <article class="card hydration-card">
    <p>Your average water intake is</p><p><span class="number">${hydrationData.calculateAverageOunces(id)}</span></p> <p>oz per day.</p>
  </article>`);
  hydrationHistoryCard.insertAdjacentHTML('afterBegin', `<article class="card hydration-card">
    <p>Water intake this week:</p>
    <ul class="card-list" id="hydrationThisWeek">
      ${makeHydrationHTML(id, hydrationData, userStorage, hydrationData.calculateFirstWeekOunces(userStorage, id))}
    </ul>
  </article>
  <article class="card hydration-card">
    <ul class="card-list" id="hydrationEarlierWeek">
      ${makeHydrationHTML(id, hydrationData, userStorage, hydrationData.calculateRandomWeekOunces(laterDateString, id, userStorage))}
    </ul>
  </article>`);
}
