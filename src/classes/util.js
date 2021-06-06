export const averager = (array, key) => array.reduce((acc, data) => acc += data[key], 0) / array.length;

export const finder = (array, id, date) => {
  return array.find(data => {
    return id === data.userID && date === data.date;
  });
}

export const findDataByDate = (array, date, id, userRepo, key, weekDate) => {
  return userRepo.getWeekFromDate(date, id, array).map((data) => `${data.date}: ${data[key]}`);
}