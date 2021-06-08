/* eslint-disable max-len */
import './css/styles.scss';
import './images/the-rock.jpg'
import './images/person-walking-on-path.jpg'
import apiCalls from './webAPI';

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
      let sleepData = new Sleep(promise[2].sleepData)
      let activityData = new Activity(promise[3].activityData)
      startApp(userData, userRepo, hydrationData, sleepData, activityData);
    })
}

function startApp(userData, userRepo, hydration, sleep, activityData) {
  // let sleepData = sleep.sleepData
  let hydrationData = hydration.hydrationData
  let currentUser = findRandomUser(getRandomNum(userData), userRepo);
  let currentUserId = currentUser.id
  let currentDate = findCurrentDate(userRepo, currentUser, hydrationData)[0].date;
  let randomDate = getRandomDate(findCurrentDate(userRepo, currentUser, hydrationData));
  addInfoToSidebar(currentUser, userRepo);
  addInfo(currentUserId, hydration, currentDate, userRepo, randomDate);
  addInfo(currentUserId, sleep, currentDate, userRepo, randomDate);
  // let winnerNow = makeWinnerID(activityRepo, currentUser, today, userRepo);
  // addActivityInfo(currentUser, activityRepo, today, userRepo, randomDate, currentUser, winnerNow);
  // addFriendGameInfo(currentUser, activityRepo, userRepo, today, randomDate, currentUser);
}

function getRandomNum(input) {
  return Math.floor(Math.random() * input.length);
}

function findRandomUser(currentUserId, users) {
  return users.getDataFromID(currentUserId);
}

function findCurrentDate(users, currentUser, dataSet) {
  return users.makeSortedUserArray(currentUser.id, dataSet);

}

function getRandomDate(date) {
  return date[Math.floor(Math.random() * date.length + 1)].date
}

function makeWinnerID(activityInfo, user, currentDate, userStorage) {
  return activityInfo.getWinnerId(user, currentDate, userStorage)
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

function addInfo(currentUserId, dataSet, currentDate, userStorage, laterDateString) {
  const data = dataSet.constructor.name.toLowerCase();
  const todayCard = eval(`${data}TodayCard`)
  const historyCard = eval(`${data}HistoryCard`)
  let activity, action, occurrence, method1, method2, amount, consumed, rating, score;
  switch (data) {
  case 'hydration': {
    activity = 'hydration'
    action = 'drank'
    method1 = dataSet.calculateDailyOunces(currentUserId, currentDate)
    amount = 'oz water'
    consumed = 'average water intake is'
    method2 = dataSet.calculateAverageOunces(currentUserId)
    occurrence = 'oz per day.'
    rating = 'Your average water intake is'
    score =   dataSet.calculateAverageOunces(currentUserId)
    break;
  }
  case 'sleep':
    activity = 'sleep'
    action = 'slept'
    method1 = dataSet.calculateDailySleep(currentUserId, currentDate)
    amount = 'hours'
    consumed = 'sleep quality was'
    method2 = dataSet.calculateDailySleepQuality(currentUserId, currentDate)
    occurrence = 'out of 5.'
    rating = `The average user's sleep quality is`
    score = Math.round(dataSet.calculateAllUserSleepQuality() * 100) / 100
    break;
  case 'activity':
    activity = 'activity'
    break;
  }


  todayCard.insertAdjacentHTML('afterBegin', `
  <article class="card ${activity}-card">
  <p>You ${action}</p> 
  <p>
  <span class="number">
  ${method1}
  </span>
  </p>  
  <p>${amount} today.</p>
</article>
<article class="card ${activity}-card">
  <p>Your ${consumed}</p> 
  <p>
  <span class="number">
  ${method2}
  </span>
  </p>
  <p>${occurrence}</p>
</article>
<article class="card ${activity}-card">
  <p>${rating}</p> 
  <p>
  <span class="number">
  ${score}
  </span>
  </p>
  <p>${occurrence}</p>
</article>`);
  historyCard.insertAdjacentHTML('afterBegin', `
  <article class="card sleep-card">
  <p>Hours of sleep this week</p>
  <ul class="card-list" id="sleepThisWeek">
  ${makeSleepHTML(currentUserId, data, userStorage, dataSet.calculateWeekSleep(currentDate, currentUserId, userStorage))}
  </ul>
</article>
<article class="card sleep-card">
  <ul class="card-list" id="sleepEarlierWeek">
    ${makeSleepHTML(currentUserId, data, userStorage, dataSet.calculateWeekSleep(laterDateString, currentUserId, userStorage))}
  </ul>
</article>
`);
}


//dom helpers 
function makeFriendHTML(user, userStorage) {
  return user.getFriendsNames(userStorage).map(friendName => `<li class='historical-list-listItem'>${friendName}</li>`).join('');
}

function makeHydrationHTML(currentUserId, hydrationInfo, userStorage, method) {
  return method.map(drinkData => `<li class="historical-list-listItem">On ${drinkData}oz</li>`).join('');
}

function makeSleepHTML(currentUserId, data, userStorage, method) {
  return method.map(sleepData => `<li class="historical-list-listItem">On ${sleepData} hours</li>`).join('');
}

function makeSleepQualityHTML(currentUserId, data, userStorage, method) {
  return method.map(sleepQualityData => `<li class="historical-list-listItem">On ${sleepQualityData}/5 quality of sleep</li>`).join('');
}

function makeStepsHTML(currentUserId, activityInfo, userStorage, method) {
  return method.map(activityData => `<li class="historical-list-listItem">On ${activityData} steps</li>`).join('');
}

function makeStairsHTML(currentUserId, activityInfo, userStorage, method) {
  return method.map(data => `<li class="historical-list-listItem">On ${data} flights</li>`).join('');
}

function makeMinutesHTML(currentUserId, activityInfo, userStorage, method) {
  return method.map(data => `<li class="historical-list-listItem">On ${data} minutes</li>`).join('');
}

function makeFriendChallengeHTML(currentUserId, activityInfo, userStorage, method) {
  return method.map(friendChallengeData => `<li class="historical-list-listItem">Your friend ${friendChallengeData} average steps.</li>`).join('');
}

function makeStepStreakHTML(currentUserId, activityInfo, userStorage, method) {
  return method.map(streakData => `<li class="historical-list-listItem">${streakData}!</li>`).join('');
}