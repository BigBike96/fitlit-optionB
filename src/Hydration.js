import {averager,  findDataByDate,  finder}  from './util';

class Hydration {
  constructor(hydrationData) {
    this.hydrationData = hydrationData;
  }

  calculateAverageOunces(id) {
    let perDayUserHydration = this.hydrationData.filter(data => id === data.userID);
    return averager(perDayUserHydration, `numOunces`);
  }

  calculateDailyOunces(id, date) {
    return finder(this.hydrationData, id, date).numOunces;
  }

  calculateFirstWeekOunces(userRepo, id) {
    return userRepo.getFirstWeek(id, this.hydrationData).map((data) => `${data.date}: ${data.numOunces}`);
  }

  calculateRandomWeekOunces(date, id, userRepo) {
    return findDataByDate(date, id, this.hydrationData, userRepo, 'numOunces');
  }

}

export default Hydration;
