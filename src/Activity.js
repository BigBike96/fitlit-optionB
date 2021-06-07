import { finder, averager, findDataByDate } from "./util";

class Activity {
  constructor(activityData) {
    this.activityData = activityData
  }

  getMilesFromStepsByDate(id, date, userRepo) {
    let userStepsByDate = finder(this.activityData, id, date)
    return parseFloat(((userStepsByDate.numSteps * userRepo.strideLength) / 5280).toFixed(1));
  }

  getActiveMinutesByDate(id, date) {
    return finder(this.activityData, id, date).minutesActive
  }

  calculateActiveAverageForWeek(id, date, userRepo) {
    return parseFloat((userRepo.getWeekFromDate(date, id, this.activityData).reduce((acc, elem) => {
      return acc += elem.minutesActive;
    }, 0) / 7).toFixed(1));
  }

  accomplishStepGoal(id, date, userRepo) {
    let userStepsByDate = finder(this.activityData, id, date);
    return userStepsByDate.numSteps === userRepo.dailyStepGoal ? true : false;
  }
  // accomplishStepGoal(id, date, userRepo) {
  //   let userStepsByDate = finder(this.activityData, id, date);
  //   if (userStepsByDate.numSteps === userRepo.dailyStepGoal) {
  //     return true;
  //   }
  //   return false
  // }

  getDaysGoalExceeded(id, userRepo) {
    return this.activityData.filter(data => id === data.userID && data.numSteps > userRepo.dailyStepGoal).map(data => data.date);
  }

  getStairRecord(id) {
    return this.activityData.filter(data => id === data.userID).reduce((acc, elem) => (elem.flightsOfStairs > acc) ? elem.flightsOfStairs : acc, 0);
  }

  getAllUserAverageForDay(date, userRepo, relevantData) {
    let selectedDayData = userRepo.chooseDayDataForAllUsers(this.activityData, date);
     return parseFloat(averager(selectedDayData, relevantData).toFixed(1));
  }

  userDataForToday(id, date, userRepo, relevantData) {
    let userData = userRepo.getDataFromUserID(id, this.activityData);
    return userData.find(data => data.date === date)[relevantData];
  }

  userDataForWeek(id, date, userRepo, relevantData) {
    return findDataByDate(date, id, this.activityData, userRepo, relevantData);
  }

  getFriendsActivity(user, userRepo) {
    let data = this.activityData;
    let userDatalist = user.friends.map(friend => userRepo.getDataFromUserID(friend, data));
    return userDatalist.reduce((arraySoFar, listItem) => arraySoFar.concat(listItem), []);
  }

  getFriendsAverageStepsForWeek(user, date, userRepo) {
    let friendsActivity = this.getFriendsActivity(user, userRepo);
    let timeline = userRepo.chooseWeekDataForAllUsers(friendsActivity, date);
    return userRepo.combineRankedUserIDsAndAveragedData(friendsActivity, date, 'numSteps', timeline);
  }

  showChallengeListAndWinner(user, date, userRepo) {
    let rankedList = this.getFriendsAverageStepsForWeek(user, date, userRepo);

    return rankedList.map(listItem => {
      let userID = Object.keys(listItem)[0];
      let userName = userRepo.getDataFromID(parseInt(userID)).name;
      return `${userName}: ${listItem[userID]}`;
    })
  }

  showcaseWinner(user, date, userRepo) {
    // NAMED LIST IS NOT BEING USED AT THIS TIME 6-6 @ 6:30PM
    // let namedList = this.showChallengeListAndWinner(user, date, userRepo);
    // console.log('namedList>>>>>>>>>>', namedList);
    return this.showChallengeListAndWinner(user, date, userRepo).shift();
  }

  getStreak(userRepo, id, relevantData) {
    let data = this.activityData;
    let sortedUserArray = (userRepo.makeSortedUserArray(id, data)).reverse();
    let streaks = sortedUserArray.filter((element, index) => {
      if (index >= 2) {
        return (sortedUserArray[index - 2][relevantData] < sortedUserArray[index - 1][relevantData] && sortedUserArray[index - 1][relevantData] < sortedUserArray[index][relevantData])
      }
    });
    return streaks.map((streak) => {
      return streak.date;
    })
  }

  getWinnerId(user, date, userRepo) {
    let rankedList = this.getFriendsAverageStepsForWeek(user, date, userRepo);
    let keysList = rankedList.map(listItem => Object.keys(listItem));
    return parseInt(keysList[0].join(''));
  }
}

export default Activity;
