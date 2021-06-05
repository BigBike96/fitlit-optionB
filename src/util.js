export const averager = (array, key) => array.reduce((acc, data) => acc += data[key], 0) / array.length;

export const finder = (array, id, date) => {
  return array.find(data => {
    return id === data.userID && date === data.date;
  });
}

export const findDataByDate = (array, date, id, userRepo, key, weekDate) => {
  return userRepo.getWeekFromDate(date, id, array).map((data) => `${data.date}: ${data[key]}`);
}
// export const 

//export default {averager, finder};

// calculateAverageSleep(id) {
//     let perDaySleep = this.sleepData.filter((data) => id === data.userID);
//     return perDaySleep.reduce((sumSoFar, data) => {
//       return sumSoFar += data.hoursSlept;
//     }, 0) / perDaySleep.length;
//   }
 
// function(sumSoFar, sleepQualityValue) {
//     sumSoFar += sleepQualityValue
//     return sumSoFar;
//   }, 0)