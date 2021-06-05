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
    //let findOuncesByDate = this.hydrationData.find((data) => id === data.userID && date === data.date);
    //console.log(finder(this.hydrationData, id, date).numOunces)
    return finder(this.hydrationData, id, date).numOunces;
    //return findOuncesByDate.numOunces;
  }

  calculateFirstWeekOunces(userRepo, id) {
    return userRepo.getFirstWeek(id, this.hydrationData).map((data) => `${data.date}: ${data.numOunces}`);
  }
  
  calculateRandomWeekOunces(date, id, userRepo) {
    //return userRepo.getWeekFromDate(date, id, this.hydrationData).map((data) => `${data.date}: ${data.numOunces}`);
    //console.log(findDataByDate(this.hydrationData, date, id, userRepo, 'numOunces'));
    return findDataByDate(this.hydrationData, date, id, userRepo, 'numOunces');
  }

}


export default Hydration;
