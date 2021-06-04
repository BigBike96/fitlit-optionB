

const totaller = (array, key) => {
  return array.reduce((acc, data) => {
    return acc += data[key];
  }, 0) / array.length;
}

export default totaller;

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