import './css/base.scss';
import './css/styles.scss';

import './images/person walking on path.jpg';
import './images/The Rock.jpg';

import userData from './data/users';
import hydrationData from './data/hydration';
import sleepData from './data/sleep';
import activityData from './data/activity';

import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import UserRepo from './User-repo';

var sidebarName = document.getElementById('sidebarName');
var stepGoalCard = document.getElementById('stepGoalCard');
var headerText = document.getElementById('headerText');
var userAddress = document.getElementById('userAddress');
var userEmail = document.getElementById('userEmail');
var userStridelength = document.getElementById('userStridelength');
var friendList = document.getElementById('friendList');

var hydrationAverage = document.getElementById('hydrationAverage');
var hydrationThisWeek = document.getElementById('hydrationThisWeek');
var hydrationEarlierWeek = document.getElementById('hydrationEarlierWeek');
var historicalWeek = document.querySelectorAll('.historicalWeek');
var sleepToday = document.getElementById('sleepToday');
var sleepQualityToday = document.getElementById('sleepQualityToday');
var avUserSleepQuality = document.getElementById('avUserSleepQuality');
var sleepThisWeek = document.getElementById('sleepThisWeek');
var sleepEarlierWeek = document.getElementById('sleepEarlierWeek');
var friendChallengeListToday = document.getElementById('friendChallengeListToday');
var friendChallengeListHistory = document.getElementById('friendChallengeListHistory');
var bigWinner = document.getElementById('bigWinner');
var userStepsToday = document.getElementById('userStepsToday');
var avgStepsToday = document.getElementById('avgStepsToday');
var userStairsToday = document.getElementById('userStairsToday');
var avgStairsToday = document.getElementById('avgStairsToday');
var userMinutesToday = document.getElementById('userMinutesToday');
var avgMinutesToday = document.getElementById('avgMinutesToday');
var userStepsThisWeek = document.getElementById('userStepsThisWeek');
var userStairsThisWeek = document.getElementById('userStairsThisWeek');
var userMinutesThisWeek = document.getElementById('userMinutesThisWeek');
var bestUserSteps = document.getElementById('bestUserSteps');
var streakList = document.getElementById('streakList');
var streakListMinutes = document.getElementById('streakListMinutes')

const hydrationTodayCard = document.querySelector('#hydrationTodayCard');
const hydrationHistoryCard = document.querySelector('#hydrationHistoryCard');
const activityTodayCard = document.querySelector('#activityTodayCard');
const activityHistoryCard = document.querySelector('#activityHistoryCard');
const sleepTodayCard = document.querySelector('#sleepTodayCard');
const sleepHistoryCard = document.querySelector('#sleepHistoryCard');

function startApp() {
  let userList = [];
  makeUsers(userList);
  let userRepo = new UserRepo(userList);
  let hydrationRepo = new Hydration(hydrationData);
  let sleepRepo = new Sleep(sleepData);
  let activityRepo = new Activity(activityData);
  var userNowId = pickUser();
  let userNow = getUserById(userNowId, userRepo);
  let today = makeToday(userRepo, userNowId, hydrationData);
  let randomHistory = makeRandomDate(userRepo, userNowId, hydrationData);
  historicalWeek.forEach(instance => instance.insertAdjacentHTML('afterBegin', `Week of ${randomHistory}`));
  addInfoToSidebar(userNow, userRepo);
  addHydrationInfo(userNowId, hydrationRepo, today, userRepo, randomHistory);
  addSleepInfo(userNowId, sleepRepo, today, userRepo, randomHistory);
  let winnerNow = makeWinnerID(activityRepo, userNow, today, userRepo);
  addActivityInfo(userNowId, activityRepo, today, userRepo, randomHistory, userNow, winnerNow);
  addFriendGameInfo(userNowId, activityRepo, userRepo, today, randomHistory, userNow);
}

function makeUsers(array) {
  userData.forEach(function(dataItem) {
    let user = new User(dataItem);
    array.push(user);
  })
}

function pickUser() {
  return Math.floor(Math.random() * 50);
}

function getUserById(id, listRepo) {
  return listRepo.getDataFromID(id);
};

function addInfoToSidebar(user, userStorage) {
  sidebarName.innerText = user.name;
  headerText.innerText = `${user.getFirstName()}'s Activity Tracker`;
  stepGoalCard.innerText = `Your daily step goal is ${user.dailyStepGoal}.`
  avStepGoalCard.innerText = `The average daily step goal is ${userStorage.calculateAverageStepGoal()}`;
  userAddress.innerText = user.address;
  userEmail.innerText = user.email;
  userStridelength.innerText = `Your stridelength is ${user.strideLength} meters.`;
  friendList.insertAdjacentHTML('afterBegin', makeFriendHTML(user, userStorage))
};

function makeFriendHTML(user, userStorage) {
  return user.getFriendsNames(userStorage).map(friendName => `<li>${friendName}</li>`).join('');
}

function makeWinnerID(activityInfo, user, dateString, userStorage){
  return activityInfo.getWinnerId(user, dateString, userStorage)
}

function makeToday(userStorage, id, dataSet) {
  var sortedArray = userStorage.makeSortedUserArray(id, dataSet);
  return sortedArray[0].date;
}

function makeRandomDate(userStorage, id, dataSet) {
  var sortedArray = userStorage.makeSortedUserArray(id, dataSet);
  return sortedArray[Math.floor(Math.random() * sortedArray.length + 1)].date

}

function addHydrationInfo(id, hydrationInfo, dateString, userStorage, laterDateString) {
  hydrationTodayCard.insertAdjacentHTML('afterBegin', `<article class="card hydration-card">
    <p>You drank</p><p><span class="number">${hydrationInfo.calculateDailyOunces(id, dateString)}</span></p><p>oz water today.</p>
  </article>
  <article class="card hydration-card">
    <p>Your average water intake is</p><p><span class="number">${hydrationInfo.calculateAverageOunces(id)}</span></p> <p>oz per day.</p>
  </article>`);
  hydrationHistoryCard.insertAdjacentHTML('afterBegin', `<article class="card hydration-card">
    <p>Water intake this week:</p>
    <ul class="card-list" id="hydrationThisWeek">
      ${makeHydrationHTML(id, hydrationInfo, userStorage, hydrationInfo.calculateFirstWeekOunces(userStorage, id))}
    </ul>
  </article>
  <article class="card hydration-card">
    <ul class="card-list" id="hydrationEarlierWeek">
      ${makeHydrationHTML(id, hydrationInfo, userStorage, hydrationInfo.calculateRandomWeekOunces(laterDateString, id, userStorage))}
    </ul>
  </article>`);
}

function makeHydrationHTML(id, hydrationInfo, userStorage, method) {
  return method.map(drinkData => `<li>On ${drinkData}oz</li>`).join('');
}

function addSleepInfo(id, sleepInfo, dateString, userStorage, laterDateString) {
  sleepTodayCard.insertAdjacentHTML('afterBegin', `<article class="card sleep-card">
    <p>You slept</p> <p><span class="number">${sleepInfo.calculateDailySleep(id, dateString)}</span></p> <p>hours today.</p>
  </article>
  <article class="card sleep-card">
    <p>Your sleep quality was</p> <p><span class="number">${sleepInfo.calculateDailySleepQuality(id, dateString)}</span></p><p>out of 5.</p>
  </article>
  <article class="card sleep-card">
    <p>The average user's sleep quality is</p> <p><span class="number">${Math.round(sleepInfo.calculateAllUserSleepQuality() *100)/100}</span></p><p>out of 5.</p>
  </article>`);
  sleepHistoryCard.insertAdjacentHTML('afterBegin', `<article class="card sleep-card">
    <p>Hours of sleep this week</p>
    <ul class="card-list" id="sleepThisWeek">
    ${makeSleepHTML(id, sleepInfo, userStorage, sleepInfo.calculateWeekSleep(dateString, id, userStorage))}
    </ul>
  </article>
  <article class="card sleep-card">
    <ul class="card-list" id="sleepEarlierWeek">
      ${makeSleepHTML(id, sleepInfo, userStorage, sleepInfo.calculateWeekSleep(laterDateString, id, userStorage))}
    </ul>
  </article>`);
}

function makeSleepHTML(id, sleepInfo, userStorage, method) {
  return method.map(sleepData => `<li>On ${sleepData} hours</li>`).join('');
}

function makeSleepQualityHTML(id, sleepInfo, userStorage, method) {
  return method.map(sleepQualityData => `<li>On ${sleepQualityData}/5 quality of sleep</li>`).join('');
}

function addActivityInfo(id, activityInfo, dateString, userStorage, laterDateString, user, winnerId) {
  activityTodayCard.insertAdjacentHTML('afterBegin', `<article class="card activity-card">
    <p>Step Count:</p><p>You</p><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'numSteps')}</span></p>
  </article>
  <article class="card activity-card">
    <p>Step Count:</p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'numSteps')}</span></p>
  </article>
  <article class="card activity-card">
    <p>Stair Count:</p><p>You</><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'flightsOfStairs')}</span></p>
  </article>
  <article class="card activity-card">
    <p>Stair Count: </p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'flightsOfStairs')}</span></p>
  </article>
  <article class="card activity-card">
    <p>Active Minutes:</p><p>You</p><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'minutesActive')}</span></p>
  </article>
  <article class="card activity-card">
    <p>Active Minutes:</p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'minutesActive')}</span></p>
  </article>`);
  activityHistoryCard.insertAdjacentHTML('afterBegin', `<article class="card activity-card">
    <p>Your steps this week</p>
    <ul class="card-list" id="userStepsThisWeek">
      ${makeStepsHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, "numSteps"))}
    </ul>
  </article>
  <article class="card activity-card">
    <p>Your stair count this week</p>
    <ul class="card-list" id="userStairsThisWeek">
      ${makeStairsHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, "flightsOfStairs"))}
    </ul>
  </article>
  <article class="card activity-card">
    <p>Your minutes of activity this week</p>
    <ul class="card-list" id="userMinutesThisWeek">
      ${makeMinutesHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, "minutesActive"))}
    </ul>
  </article>
  <article class="card activity-card">
    <p>Winner's steps this week</p>
    <ul class="card-list" id="bestUserSteps">
      ${makeStepsHTML(user, activityInfo, userStorage, activityInfo.userDataForWeek(winnerId, dateString, userStorage, "numSteps"))}
    </ul>
  </article>`);
}

function makeStepsHTML(id, activityInfo, userStorage, method) {
  return method.map(activityData => `<li>On ${activityData} steps</li>`).join('');
}

function makeStairsHTML(id, activityInfo, userStorage, method) {
  return method.map(data => `<li>On ${data} flights</li>`).join('');
}

function makeMinutesHTML(id, activityInfo, userStorage, method) {
  return method.map(data => `<li>On ${data} minutes</li>`).join('');
}

function addFriendGameInfo(id, activityInfo, userStorage, dateString, laterDateString, user) {
  friendChallengeListToday.insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(id, activityInfo, userStorage, activityInfo.showChallengeListAndWinner(user, dateString, userStorage)));
  streakList.insertAdjacentHTML("afterBegin", makeStepStreakHTML(id, activityInfo, userStorage, activityInfo.getStreak(userStorage, id, 'numSteps')));
  streakListMinutes.insertAdjacentHTML("afterBegin", makeStepStreakHTML(id, activityInfo, userStorage, activityInfo.getStreak(userStorage, id, 'minutesActive')));
  friendChallengeListHistory.insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(id, activityInfo, userStorage, activityInfo.showChallengeListAndWinner(user, dateString, userStorage)));
  bigWinner.insertAdjacentHTML('afterBegin', `This Week's Winner! ${activityInfo.showcaseWinner(user, dateString, userStorage)} steps`)
}

function makeFriendChallengeHTML(id, activityInfo, userStorage, method) {
  return method.map(friendChallengeData => `<li>Your friend ${friendChallengeData} average steps.</li>`).join('');
}

function makeStepStreakHTML(id, activityInfo, userStorage, method) {
  return method.map(streakData => `<li>${streakData}!</li>`).join('');
}

startApp();
