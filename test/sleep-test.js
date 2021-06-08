import { expect } from 'chai';
import  testData  from './sampleData';
import Sleep from '../src/Sleep';
import UserRepo from '../src/User-repo';
import User from '../src/User';

describe('Sleep', () => {
  let sleepData, sleep, user1, user2, user3, user4, user5, users, userRepo;

  beforeEach(() => {
    sleepData = testData.repoTwoSleep
    sleep = new Sleep(sleepData);
    user1 = new User(testData.repoTwoUsers[0]);
    user2 = new User(testData.repoTwoUsers[1]);
    user3 = new User(testData.repoTwoUsers[2]);
    user4 = new User(testData.repoTwoUsers[3]);
    user5 = new User(testData.repoTwoUsers[4]);
    users = [user1, user2, user3, user4, user5];
    userRepo = new UserRepo(users);
  });

  it('should take in a list of data', () => {
    expect(sleep.sleepData[1].userID).to.equal(2);
    expect(sleep.sleepData[3].hoursSlept).to.equal(5.4);
    expect(sleep.sleepData[6].sleepQuality).to.equal(3);
    expect(sleep.sleepData[7].date).to.equal('2018/07/23');
  });

  it('should find the average sleep hours per day for a user', () => {
    expect(sleep.calculateAverageSleep(3)).to.equal(3);
  });

  it('should find the average sleep quality per day for a user', () => {
    expect(sleep.calculateAverageSleepQuality(3)).to.equal(2);
  });

  it('should find the sleep hours for a user on a specified date', () => {
    expect(sleep.calculateDailySleep(2, "2017/06/15")).to.equal(7);
    expect(sleep.calculateDailySleep(4, "2019/06/21")).to.equal(6.1);
  });

  it('should find the sleep quality for a user on a specified date', () => {
    expect(sleep.calculateDailySleepQuality(2, "2017/06/15")).to.equal(4.7);
    expect(sleep.calculateDailySleepQuality(4, "2019/06/21")).to.equal(3.5);
  });

  it('should find sleep by day for that days week', () => {

    expect(sleep.calculateWeekSleep('2019/06/18', 4, userRepo)[0]).to.deep.equal('2019/06/18: 7.9');
    expect(sleep.calculateWeekSleep('2019/06/18', 4, userRepo)[6]).to.deep.equal('2017/06/15: 5.4');
  });

  it('should find sleep quality by day for that days week', () => {

    expect(sleep.calculateWeekSleepQuality('2019/06/18', 4, userRepo)[0]).to.deep.equal('2019/06/18: 1.6');
    expect(sleep.calculateWeekSleepQuality('2019/06/18', 4, userRepo)[6]).to.deep.equal('2017/06/15: 3');
  });

  it('should determine the best quality sleepers for a week', () => {

    expect(sleep.determineBestSleepers("2019/06/21", userRepo)).to.deep.equal(["Allie McCarthy", "Bugs Bunny"]);
  });

  it('should return person with best quality sleep for the week', () => {

    expect(sleep.determineSleepWinnerForWeek("2019/06/21", userRepo)).to.deep.equal(["Bugs Bunny"]);
  });

  it('should return all qualifying users if best quality sleep is a tie', () => {
    sleepData = sleepData.push({
      "userID": 6,
      "date": "2019/06/15",
      "hoursSlept": 9,
      "sleepQuality": 4
    })
    let user6 = new User({
      id: 6,
      name: "Richmond",
      address: "1234 Looney Street, Denver CO 80301-1697",
      email: "BugsB1@hotmail.com",
      strideLength: 3.8,
      dailyStepGoal: 7000,
      friends: [1, 2, 3]
    });
    users = [user1, user2, user3, user4, user5, user6];
    userRepo = new UserRepo(users);

    expect(sleep.determineSleepWinnerForWeek("2019/06/21", userRepo)).to.deep.equal(["Bugs Bunny", "Richmond"]);
  });

  it('should return person with longest sleep for the day', () => {

    expect(sleep.determineSleepHoursWinnerForDay('2019/06/21', userRepo)).to.deep.equal(["Bugs Bunny"]);
  });

  it('should return all qualifying users if longest sleep is a tie', () => {
    sleepData = sleepData.push({
      "userID": 6,
      "date": "2019/06/21",
      "hoursSlept": 9,
      "sleepQuality": 4
    })
    let user6 = new User({
      id: 6,
      name: "Richmond",
      address: "1234 Looney Street, Denver CO 80301-1697",
      email: "BugsB1@hotmail.com",
      strideLength: 3.8,
      dailyStepGoal: 7000,
      friends: [1, 2, 3]
    });
    users = [user1, user2, user3, user4, user5, user6];
    userRepo = new UserRepo(users);

    expect(sleep.determineSleepHoursWinnerForDay('2019/06/21', userRepo)).to.deep.equal(["Bugs Bunny", "Richmond"]);
  });
});
