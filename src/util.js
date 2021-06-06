
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
