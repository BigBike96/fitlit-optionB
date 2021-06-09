import userData from './data/users';
import hydrationData from './data/hydration';
import sleepData from './data/sleep';
import activityData from './data/activity';

// import calculateHydrationAverageForWeek from './classes/util';

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
const activityHistoryCard = document.querySelector('#activityHistoryCard');
const activityTodayCard = document.querySelector('#activityTodayCard');
const bigWinner = document.getElementById('bigWinner');
const friendChallengeListHistory = document.getElementById('friendChallengeListHistory');
const friendChallengeListToday = document.getElementById('friendChallengeListToday');
const friendList = document.getElementById('friendList');
const headerText = document.getElementById('headerText');
const streakList = document.getElementById('streakList');
const streakListMinutes = document.getElementById('streakListMinutes')
const sidebarName = document.getElementById('sidebarName');
const stepGoalCard = document.getElementById('stepGoalCard');
const userAddress = document.getElementById('userAddress');
const userEmail = document.getElementById('userEmail');
const userStridelength = document.getElementById('userStridelength');

// start application
window.onload = () => {
  let activity1 = {"userID": 7, "date": "Jun/05/2021", "numSteps": 8008, "minutesActive": 350, "flightsOfStairs": 22}
  apiCalls.postData(activity1, 'activity')
  let sleep1 = {"userID": 8, "date": "Jun/06/2021", "hoursSlept": 2, "sleepQuality": 2};
  apiCalls.postData(sleep1, 'sleep')
  let hydration1 = {"userID": 9, "date": "Jun/07/2021", "numOunces": 88};
  apiCalls.postData(hydration1, 'hydration')

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

function startApp(userData, userRepo, hydration, sleep, activity) {
  let hydrationData = hydration.hydrationData
  let currentUser = findRandomUser(getRandomNum(userData), userRepo);
  let currentUserId = currentUser.id
  let currentDate = findCurrentDate(userRepo, currentUser, hydrationData)[0].date;
  let randomDate = getRandomDate(findCurrentDate(userRepo, currentUser, hydrationData));
  let winner = findWinner(activity, currentUser, currentDate, userRepo);
  addInfoToSidebar(currentUser, userRepo);
  addInfo(currentUserId, hydration, currentDate, userRepo, randomDate);
  addInfo(currentUserId, sleep, currentDate, userRepo, randomDate);
  addActivityInfo(currentUser, currentUserId, activity, currentDate, userRepo, winner);
  addFriendGameInfo(currentUser, activity, userRepo, currentDate, currentUserId);
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

function findWinner(activityInfo, user, currentDate, userStorage) {
  return activityInfo.getWinnerId(user, currentDate, userStorage)
}

// dom functions
function addInfoToSidebar(user, userStorage) {
  sidebarName.innerText = user.name;
  headerText.innerText = `${user.getFirstName()}'s Activity Tracker`;
  stepGoalCard.innerText = `Your daily step goal is ${user.dailyStepGoal}.`
  userAddress.innerText = user.address;
  userEmail.innerText = user.email;
  userStridelength.innerText = `Your stridelength is ${user.strideLength} meters.`;
  friendList.insertAdjacentHTML('afterBegin', makeFriendHTML(user, userStorage))
}

function addInfo(currentUserId, dataSet, currentDate, userStorage, randomDate) {
  const data = dataSet.constructor.name.toLowerCase();
  const todayCard = eval(`${data}TodayCard`)
  const historyCard = eval(`${data}HistoryCard`)

  let action, activity, amount, average, consumed, consumedAverage, occurrence,
    past, pastStats, present, presentStats, rating, score, week;
  switch (data) {
  case 'hydration': {
    activity = 'hydration'
    action = 'drank'
    consumed = dataSet.calculateDailyOunces(currentUserId, currentDate)
    amount = 'oz water'
    average = 'average water intake is'
    consumedAverage = dataSet.calculateAverageOunces(currentUserId).toFixed(2)
    occurrence = 'oz per day.'
    past = 'hydrationEarlierWeek'
    pastStats = makeHydrationHTML(dataSet.calculateRandomWeekOunces(randomDate, currentUserId, userStorage))
    present = 'hydrationThisWeek'
    presentStats = makeHydrationHTML(dataSet.calculateFirstWeekOunces(userStorage, currentUserId))
    rating = 'Your average water intake is'
    score = dataSet.calculateAverageOunces(currentUserId).toFixed(2)
    week = 'Water intake this week:'
    break;
  }
  case 'sleep':
    action = 'slept'
    activity = 'sleep'
    amount = 'hours'
    average = 'sleep quality was'
    consumed = dataSet.calculateDailySleep(currentUserId, currentDate)
    consumedAverage = dataSet.calculateDailySleepQuality(currentUserId, currentDate)
    occurrence = 'out of 5.'
    past = 'sleepEarlierWeek'
    pastStats = makeSleepHTML(dataSet.calculateWeekSleep(randomDate, currentUserId, userStorage))
    present = 'sleepThisWeek'
    presentStats = makeSleepHTML(dataSet.calculateWeekSleep(currentDate, currentUserId, userStorage))
    rating = `The average user's sleep quality is`
    score = Math.round(dataSet.calculateAllUserSleepQuality() * 100) / 100
    week = 'Hours of sleep this week'
    break;
  }

  todayCard.insertAdjacentHTML('afterBegin', `
  <article class="card ${activity}-card">
  <p>You ${action}</p>
  <p><span class="number">${consumed}</span></p>
  <p>${amount} today.</p>
</article>
<article class="card ${activity}-card">
  <p>Your ${average}</p>
  <p><span class="number">${consumedAverage}</span></p>
  <p>${occurrence}</p>
</article>
<article class="card ${activity}-card">
  <p>${week}</p>
  <p><span class="number">${score}</span></p>
  <p>${occurrence}</p>
</article>`);
  historyCard.insertAdjacentHTML('afterBegin', `
  <article class="card ${activity}-card">
  <p>${week}</p>
  <ul class="card-list" id="${present}">${presentStats}</ul>
</article>
<article class="card ${activity}-card">
<p>${rating}</p>
  <ul class="card-list" id="${past}">${pastStats}</ul>
</article>`);
}

function addActivityInfo(currentUser, currentUserId, activity, currentDate, userStorage, winner) {
  activityTodayCard.insertAdjacentHTML('afterBegin', `<article class="card activity-card">
  <p>Step Count:</p><p>You</p><p><span class="number">${activity.userDataForToday(currentUserId, currentDate, userStorage, 'numSteps')}</span></p>
</article>
<article class="card activity-card">
  <p>Step Count:</p><p>All Users</p><p><span class="number">${activity.getAllUserAverageForDay(currentDate, userStorage, 'numSteps')}</span></p>
</article>
<article class="card activity-card">
  <p>Stair Count:</p><p>You</><p><span class="number">${activity.userDataForToday(currentUserId, currentDate, userStorage, 'flightsOfStairs')}</span></p>
</article>
<article class="card activity-card">
  <p>Stair Count: </p><p>All Users</p><p><span class="number">${activity.getAllUserAverageForDay(currentDate, userStorage, 'flightsOfStairs')}</span></p>
</article>
<article class="card activity-card">
  <p>Active Minutes:</p><p>You</p><p><span class="number">${activity.userDataForToday(currentUserId, currentDate, userStorage, 'minutesActive')}</span></p>
</article>
<article class="card activity-card">
  <p>Active Minutes:</p><p>All Users</p><p><span class="number">${activity.getAllUserAverageForDay(currentDate, userStorage, 'minutesActive')}</span></p>
</article>`);
  activityHistoryCard.insertAdjacentHTML('afterBegin', `<article class="card activity-card">
  <p>Your steps this week</p>
  <ul class="card-list" id="userStepsThisWeek">
    ${makeStepsHTML(activity.userDataForWeek(currentUserId, currentDate, userStorage, "numSteps"))}
  </ul>
</article>
<article class="card activity-card">
  <p>Your stair count this week</p>
  <ul class="card-list" id="userStairsThisWeek">
    ${makeStairsHTML(activity.userDataForWeek(currentUserId, currentDate, userStorage, "flightsOfStairs"))}
  </ul>
</article>
<article class="card activity-card">
  <p>Your minutes of activity this week</p>
  <ul class="card-list" id="userMinutesThisWeek">
    ${makeMinutesHTML(activity.userDataForWeek(currentUserId, currentDate, userStorage, "minutesActive"))}
  </ul>
</article>
<article class="card activity-card">
  <p>Winner's steps this week</p>
  <ul class="card-list" id="bestUserSteps">
    ${makeStepsHTML(activity.userDataForWeek(winner, currentDate, userStorage, "numSteps"))}
  </ul>
</article>`);
}

function addFriendGameInfo(currentUser, activity, userStorage, currentDate, currentUserId) {
  friendChallengeListToday.insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(activity.showChallengeListAndWinner(currentUser, currentDate, userStorage)));
  streakList.insertAdjacentHTML("afterBegin", makeStepStreakHTML(activity.getStreak(userStorage, currentUserId, 'numSteps')));
  streakListMinutes.insertAdjacentHTML("afterBegin", makeStepStreakHTML(activity.getStreak(userStorage, currentUserId, 'minutesActive')));
  friendChallengeListHistory.insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(activity.showChallengeListAndWinner(currentUser, currentDate, userStorage)));
  bigWinner.insertAdjacentHTML('afterBegin', `THIS WEEK'S WINNER! ${activity.showcaseWinner(currentUser, currentDate, userStorage)} steps`)
}

// dom helper functions
function makeFriendHTML(user, userStorage) {
  return user.getFriendsNames(userStorage).map(friendName => `<li class='historical-list-listItem'>${friendName}</li>`).join('');
}

function makeHydrationHTML(method) {
  return method.map(drinkData => `<li class="historical-list-listItem">On ${drinkData}oz</li>`).join('');
}

function makeSleepHTML(method) {
  return method.map(sleepData => `<li class="historical-list-listItem">On ${sleepData} hours</li>`).join('');
}

function makeStepsHTML(method) {
  return method.map(activityData => `<li class="historical-list-listItem">On ${activityData} steps</li>`).join('');
}

function makeStairsHTML(method) {
  return method.map(data => `<li class="historical-list-listItem">On ${data} flights</li>`).join('');
}

function makeMinutesHTML(method) {
  return method.map(data => `<li class="historical-list-listItem">On ${data} minutes</li>`).join('');
}

function makeFriendChallengeHTML(method) {
  return method.map(friendChallengeData => `<li class="historical-list-listItem">Your friend ${friendChallengeData} average steps.</li>`).join('');
}

function makeStepStreakHTML(method) {
  return method.map(streakData => `<li class="historical-list-listItem">${streakData}!</li>`).join('');
}
