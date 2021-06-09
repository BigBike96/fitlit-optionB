/* eslint-disable max-len */
/*
// makeSleepQualityHTML is never used anywhere.
function makeSleepQualityHTML(id, sleepInfo, userStorage, method) {
  return method.map(sleepQualityData => `<li class="historical-list-listItem">On ${sleepQualityData}/5 quality of sleep</li>`).join('');
}

// This is never used. Confirmed by dean that its not even in the rubric
avStepGoalCard.innerText = The average daily step goal is ${userStorage.calculateAverageStepGoal()};
*/

// Removed this from startApp for separation of concerns
// historicalWeek.forEach(instance => instance.insertAdjacentHTML('afterBegin', `Week of ${randomDate}`));


// Dynamic dom for data info
/*
function addInfo(id, dataSet, dateString, userStorage, laterDateString) {

  let data = dataSet.constructor.name
  let todayCard = eval(`${data.toLowerCase()}TodayCard`)
  let makeHtml = eval(`make${data}HTML`)

  todayCard.insertAdjacentHTML('afterBegin', 
    `<article class="card hydration-card">
  <p>You drank</p>
  <p><span class="number">${dataSet.calculateDailyOunces(id, dateString)}</span></p>
  <p>oz water today.</p>
</article>
<article class="card hydration-card">
  <p>Your average water intake is</p>
  <p><span class="number">${dataSet.calculateAverageOunces(id)}</span></p>
  <p>oz per day.</p>
</article>`);
  todayCard.insertAdjacentHTML('afterBegin', `<article
  class="card hydration-card">
  <p>Water intake this week:</p>
  <ul class="card-list" id="hydrationThisWeek"> ${makeHtml(id, dataSet, userStorage,
    dataSet.calculateFirstWeekOunces(userStorage, id))} </ul>
</article>
<article class="card hydration-card">
  <ul class="card-list" id="hydrationEarlierWeek"> ${makeHtml(id, dataSet,
    userStorage, dataSet.calculateRandomWeekOunces(laterDateString, id, userStorage))} </ul>
</article>`
  );
}
*/

// ============== Deans code

// function addHydrationInfo(id, hydrationInfo, dateString, userStorage, laterDateString) {
//   hydrationTodayCard.insertAdjacentHTML('afterBegin', `
//   <article class="card hydration-card">
//     <p>You drank</p>
//     <p>
//     <span class="number">
//     ${hydrationInfo.calculateDailyOunces(id, dateString)}
//     </span>
//     </p>
//     <p>oz water today.</p>
//   </article>
//   <article class="card hydration-card">
//     <p>Your average water intake is</p>
//     <p><span class="number">
//     <p>oz per day.</p>
//     ${hydrationInfo.calculateAverageOunces(id)}
//     </span></p> 
//   </article>`);
//   hydrationHistoryCard.insertAdjacentHTML('afterBegin', `<article class="card hydration-card">
//     <p>Water intake this week:</p>
//     <ul class="card-list" id="hydrationThisWeek">
//       ${makeHydrationHTML(id, hydrationInfo, userStorage, hydrationInfo.calculateFirstWeekOunces(userStorage, id))}
//     </ul>
//   </article>
//   <article class="card hydration-card">
//     <ul class="card-list" id="hydrationEarlierWeek">
//       ${makeHydrationHTML(id, hydrationInfo, userStorage, hydrationInfo.calculateRandomWeekOunces(laterDateString, id, userStorage))}
//     </ul>
//   </article>`);
// }

// function addSleepInfo(id, sleepInfo, dateString, userStorage, laterDateString) {
//   sleepTodayCard.insertAdjacentHTML('afterBegin', `<article class="card sleep-card">
//     <p>You slept</p> <p><span class="number">${sleepInfo.calculateDailySleep(id, dateString)}</span></p> <p>hours today.</p>
//   </article>
//   <article class="card sleep-card">
//     <p>Your sleep quality was</p> <p><span class="number">${sleepInfo.calculateDailySleepQuality(id, dateString)}</span></p><p>out of 5.</p>
//   </article>
//   <article class="card sleep-card">
//     <p>The average user's sleep quality is</p> <p><span class="number">${Math.round(sleepInfo.calculateAllUserSleepQuality() * 100) / 100}</span></p><p>out of 5.</p>
//   </article>`);
//   sleepHistoryCard.insertAdjacentHTML('afterBegin', `<article class="card sleep-card">
//     <p>Hours of sleep this week</p>
//     <ul class="card-list" id="sleepThisWeek">
//     ${makeSleepHTML(id, sleepInfo, userStorage, sleepInfo.calculateWeekSleep(dateString, id, userStorage))}
//     </ul>
//   </article>
//   <article class="card sleep-card">
//     <ul class="card-list" id="sleepEarlierWeek">
//       ${makeSleepHTML(id, sleepInfo, userStorage, sleepInfo.calculateWeekSleep(laterDateString, id, userStorage))}
//     </ul>
//   </article>`);
// }


// function addActivityInfo(id, activityInfo, dateString, userStorage, laterDateString, user, winnerId) {
//   activityTodayCard.insertAdjacentHTML('afterBegin', `<article class="card activity-card">
//     <p>Step Count:</p><p>You</p><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'numSteps')}</span></p>
//   </article>
//   <article class="card activity-card">
//     <p>Step Count:</p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'numSteps')}</span></p>
//   </article>
//   <article class="card activity-card">
//     <p>Stair Count:</p><p>You</><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'flightsOfStairs')}</span></p>
//   </article>
//   <article class="card activity-card">
//     <p>Stair Count: </p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'flightsOfStairs')}</span></p>
//   </article>
//   <article class="card activity-card">
//     <p>Active Minutes:</p><p>You</p><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'minutesActive')}</span></p>
//   </article>
//   <article class="card activity-card">
//     <p>Active Minutes:</p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'minutesActive')}</span></p>
//   </article>`);
//   activityHistoryCard.insertAdjacentHTML('afterBegin', `<article class="card activity-card">
//     <p>Your steps this week</p>
//     <ul class="card-list" id="userStepsThisWeek">
//       ${makeStepsHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, "numSteps"))}
//     </ul>
//   </article>
//   <article class="card activity-card">
//     <p>Your stair count this week</p>
//     <ul class="card-list" id="userStairsThisWeek">
//       ${makeStairsHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, "flightsOfStairs"))}
//     </ul>
//   </article>
//   <article class="card activity-card">
//     <p>Your minutes of activity this week</p>
//     <ul class="card-list" id="userMinutesThisWeek">
//       ${makeMinutesHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, "minutesActive"))}
//     </ul>
//   </article>
//   <article class="card activity-card">
//     <p>Winner's steps this week</p>
//     <ul class="card-list" id="bestUserSteps">
//       ${makeStepsHTML(user, activityInfo, userStorage, activityInfo.userDataForWeek(winnerId, dateString, userStorage, "numSteps"))}
//     </ul>
//   </article>`);
// }




//My old code for dynamic html
//you drank, you slept, and you walked
// todayCard.insertAdjacentHTML('afterBegin', 
//   `<article class="card ${smData}-card">
//     <p>You ${verb}</p> 
//     <p><span class="number">${calculate()}</span></p>
//     <p>${activityAmount}</p>
//   </article>
//   <article class="card ${smData}-card">
//     <p>Your average water intake is</p>
//     <p><span class="number">${average}</span></p>
//     <p>${activityAmount}</p>
//   </article>`);
// todayCard.insertAdjacentHTML('afterBegin', 
//   `<article class="card ${smData}-card">
//     <p>Water intake this week:</
//     <ul class="card-list" id="hydrationThisWeek"> ${makeHtml(id, dataSet, userStorage, dataSet.calculateFirstWeekOunces(userStorage, id))} </ul>
//   </article>
//   <article class="card ${smData}-card">
//     <ul class="card-list" id="hydrationEarlierWeek"> ${makeHtml(id, dataSet, userStorage, dataSet.calculateRandomWeekOunces(laterDateString, id, userStorage))} </ul>
//   </article>`
// );


// <article class="card activity-card">
// <p>Step Count:</p><p>All Users</p><p><span class="number">${activitygetAllUserAverageForDay(dateString, userStorage, 'numSteps')}</span></p>
// </article>
// <article class="card activity-card">
// <p>Stair Count:</p><p>You</><p><span class="number">${activityuserDataForToday(id, dateString, userStorage, 'flightsOfStairs')}</span></p>
// </article>
// <article class="card activity-card">
// <p>Stair Count: </p><p>All Users</p><p><span class="number">${activitygetAllUserAverageForDay(dateString, userStorage, 'flightsOfStairs')}</span></p>
// </article>
// <article class="card activity-card">
// <p>Active Minutes:</p><p>You</p><p><span class="number">${activityuserDataForToday(id, dateString, userStorage, 'minutesActive')}</span></p>
// </article>
// <article class="card activity-card">
// <p>Active Minutes:</p><p>All Users</p><p><span class="number">${activitygetAllUserAverageForDay(dateString, userStorage, 'minutesActive')}</span></p>
// </article>`);
// historyCard.insertAdjacentHTML('afterBegin', `<article class="card activity-card">
// <p>Your steps this week</p>
// <ul class="card-list" id="userStepsThisWeek">
//   ${makeStepsHTML(id, activityInfo, userStorage, activityuserDataForWeek(id, dateString, userStorage, "numSteps"))}
// </ul>
// </article>
// <article class="card activity-card">
// <p>Your stair count this week</p>
// <ul class="card-list" id="userStairsThisWeek">
//   ${makeStairsHTML(id, activityInfo, userStorage, activityuserDataForWeek(id, dateString, userStorage, "flightsOfStairs"))}
// </ul>
// </article>
// <article class="card activity-card">
// <p>Your minutes of activity this week</p>
// <ul class="card-list" id="userMinutesThisWeek">
//   ${makeMinutesHTML(id, activityInfo, userStorage, activityuserDataForWeek(id, dateString, userStorage, "minutesActive"))}
// </ul>
// </article>
// <article class="card activity-card">
// <p>Winner's steps this week</p>
// <ul class="card-list" id="bestUserSteps">
//   ${makeStepsHTML(user, activityInfo, userStorage, activityuserDataForWeek(winnerId, dateString, userStorage, "numSteps"))}
// </ul>
// </article>`)


// Unused querySelector 
// const sleepTodayCard = document.querySelector('#sleepTodayCard');
// const sleepHistoryCard = document.querySelector('#sleepHistoryCard');
// const hydrationTodayCard = document.querySelector('#hydrationTodayCard');
// const hydrationHistoryCard = document.querySelector('#hydrationHistoryCard');
// const historicalWeek = document.querySelectorAll('.historicalWeek');
