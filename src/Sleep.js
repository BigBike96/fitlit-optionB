import sleepData from './data/sleep';
import { averager, finder, findDataByDate } from './util';

class Sleep {
  constructor(sleepData) {
    this.sleepData = sleepData;
  }

  calculateAverageSleep(id) {
    let perDaySleep = this.sleepData.filter(data => id === data.userID);
    return averager(perDaySleep, `hoursSlept`);
  }

  calculateAverageSleepQuality(id) {
    let perDaySleepQuality = this.sleepData.filter(data => id === data.userID);
    return averager(perDaySleepQuality, 'sleepQuality');
  }

  calculateDailySleep(id, date) {
    return finder(this.sleepData, id, date).hoursSlept;
  }

  calculateDailySleepQuality(id, date) {
    return finder(this.sleepData, id, date).sleepQuality;
  }

  calculateWeekSleep(date, id, userRepo) {
    return findDataByDate(date, id, this.sleepData, userRepo, 'hoursSlept');
  }

  calculateWeekSleepQuality(date, id, userRepo) {
    return findDataByDate(date, id, this.sleepData, userRepo, 'sleepQuality');
  }

  calculateAllUserSleepQuality() {
    return averager(this.sleepData, 'sleepQuality');
  }

  determineBestSleepers(date, userRepo) {
    let timeline = userRepo.chooseWeekDataForAllUsers(this.sleepData, date);
    let userSleepObject = userRepo.isolateUsernameAndRelevantData(this.sleepData, date, 'sleepQuality', timeline);

    return Object.keys(userSleepObject).filter((key) => (averager(userSleepObject[key]) > 3))
                                       .map(sleeper => userRepo.getDataFromID(parseInt(sleeper)).name);
   }

  determineSleepWinnerForWeek(date, userRepo) {
    let timeline = userRepo.chooseWeekDataForAllUsers(this.sleepData, date);
    let sleepRankWithData = userRepo.combineRankedUserIDsAndAveragedData(this.sleepData, date, 'sleepQuality', timeline);

    return this.getWinnerNamesFromList(sleepRankWithData, userRepo);
  }

  determineSleepHoursWinnerForDay(date, userRepo) {
    let timeline = userRepo.chooseDayDataForAllUsers(this.sleepData, date);
    let sleepRankWithData = userRepo.combineRankedUserIDsAndAveragedData(this.sleepData, date, 'hoursSlept', timeline);

    return this.getWinnerNamesFromList(sleepRankWithData, userRepo);
  }

  getWinnerNamesFromList(sortedArray, userRepo) {
    let bestSleepers = sortedArray.filter(element => element[Object.keys(element)] === Object.values(sortedArray[0])[0])
    let bestSleeperIds = bestSleepers.map(bestSleeper => (Object.keys(bestSleeper)));

    return bestSleeperIds.map(sleepNumber => userRepo.getDataFromID(parseInt(sleepNumber)).name)
  }
}

export default Sleep;
