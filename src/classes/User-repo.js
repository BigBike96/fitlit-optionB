import { averager } from "./util";

class UserRepo {
  constructor(users) {
    this.users = users;
  }

  getDataFromID(id) {
    return this.users.find(user => id === user.id);
  }

  getDataFromUserID(id, dataSet) {
    return dataSet.filter(userData => id === userData.userID);
  }

  calculateAverageStepGoal() {
    return averager(this.users, 'dailyStepGoal');
  }

  makeSortedUserArray(id, dataSet) {
    let selectedID = this.getDataFromUserID(id, dataSet)
    return selectedID.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  getToday(id, dataSet) {
    return this.makeSortedUserArray(id, dataSet)[0].date;
  }

  getFirstWeek(id, dataSet) {
    return this.makeSortedUserArray(id, dataSet).slice(0, 7);
  }

  getWeekFromDate(date, id, dataSet) {
    let dateIndex = this.makeSortedUserArray(id, dataSet).indexOf(this.makeSortedUserArray(id, dataSet).find((sortedItem) => (sortedItem.date === date)));
    return this.makeSortedUserArray(id, dataSet).slice(dateIndex, dateIndex + 7);
  }

  chooseWeekDataForAllUsers(dataSet, date) {
    return dataSet.filter((dataItem) => {
      return ((new Date(date)).setDate((new Date(date)).getDate() - 7) <= new Date(dataItem.date))
      && (new Date(dataItem.date) <= new Date(date))
    })
  }

  chooseDayDataForAllUsers(dataSet, date) {
    return dataSet.filter(dataItem => dataItem.date === date);
  }

  isolateUsernameAndRelevantData(dataSet, date, relevantData, listFromMethod) {
    return listFromMethod.reduce((acc, dataItem) => {
      (!acc[dataItem.userID]) ?
        acc[dataItem.userID] = [dataItem[relevantData]] :
        acc[dataItem.userID].push(dataItem[relevantData]);
      return acc;
    }, {});
  }

  rankUserIDsbyRelevantDataValue(dataSet, date, relevantData, listFromMethod) {
    let sortedObjectKeys = this.isolateUsernameAndRelevantData(dataSet, date, relevantData, listFromMethod)
    return Object.keys(sortedObjectKeys).sort(
      (b, a) => averager(sortedObjectKeys[a]) - averager(sortedObjectKeys[b]));
  }


  combineRankedUserIDsAndAveragedData(dataSet, date, relevantData, listFromMethod) {
    let sortedObjectKeys = this.isolateUsernameAndRelevantData(dataSet, date, relevantData, listFromMethod)
    let rankedUsersAndAverages = this.rankUserIDsbyRelevantDataValue(dataSet, date, relevantData, listFromMethod)
    return rankedUsersAndAverages.map(rankedUser => {
      rankedUser = {[rankedUser]: averager(sortedObjectKeys[rankedUser])};
      return rankedUser;
    });
  }

}

export default UserRepo;
