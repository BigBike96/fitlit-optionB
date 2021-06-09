
export const averager = (array, key) => {
  if (key !== undefined) {
    return array.reduce((acc, data) => acc += data[key], 0) / array.length;
  } else {
    return array.reduce((acc, data) => acc += data, 0) / array.length;
  }
}

export const finder = (array, id, date) => {
  return array.find(data => {
    return id === data.userID && date === data.date;
  });
}

export const findDataByDate = (date, id, array, userRepo, key) => {
  return userRepo.getWeekFromDate(date, id, array).map((data) => `${data.date}: ${data[key]}`);
}

// export const calculateHydrationAverageForWeek(id, date, userRepo) {
//   return parseFloat((userRepo.getWeekFromDate(date, id, this.activityData).reduce((acc, elem) => {
//     return acc += elem.numOunces;
//   }, 0) / 7).toFixed(1));
// }
