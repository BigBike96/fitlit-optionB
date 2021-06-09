import { expect } from 'chai';
import Hydration from '../src/classes/Hydration';
import UserRepo from '../src/classes/User-repo';
import User from '../src/classes/User';
import testData from './sampleData';

describe.only('Hydration', () => {
  let hydrationData, hydration;

  beforeEach(() => {
    hydrationData = testData.hydrationData;
    hydration = new Hydration(hydrationData);
  });

  it('should take in a list of data', () => {
    expect(hydration.hydrationData[0].userID).to.equal(1);
    expect(hydration.hydrationData[2].numOunces).to.equal(1);
    expect(hydration.hydrationData[4].date).to.equal('2018/10/23');
  });

  it('should find the average water intake per day for a user', () => {
    expect(hydration.calculateAverageOunces(3)).to.equal(2);
  });

  it('should find the water intake for a user on a specified date', () => {
    expect(hydration.calculateDailyOunces(1, "2019/06/15")).to.equal(37);
    expect(hydration.calculateDailyOunces(4, "2019/04/15")).to.equal(36);
  });

  // it('should return undefined if there is no water intake recorded for a specified date', () => {
  //   expect(hydration.calculateDailyOunces(1, "1932/01/01")).to.equal(undefined);
  // });

  it('should find water intake by day for first week', () => {
    const user3 = new User({
      id: 3,
      name: "The Rock",
      address: "1236 Awesome Street, Denver CO 80301-1697",
      email: "therock@hotmail.com",
      strideLength: 10,
      dailyStepGoal: 60000,
      friends: [1, 2, 4]
    });

    const user4 = new User({
      id: 4,
      name: "Rainbow Dash",
      address: "1237 Equestria Street, Denver CO 80301-1697",
      email: "rainbowD1@hotmail.com",
      strideLength: 3.8,
      dailyStepGoal: 7000,
      friends: [1, 2, 3]
    });
    const users = [user3, user4];
    const userRepo = new UserRepo(users);
    expect(hydration.calculateFirstWeekOunces(userRepo, 4)[0]).to.eql('2019/09/20: 40');
    expect(hydration.calculateFirstWeekOunces(userRepo, 4)[6]).to.eql('2019/04/15: 36');
  });

  it('should find sleep quality by day for that days week', () => {
    const user3 = new User({
      id: 3,
      name: "The Rock",
      address: "1236 Awesome Street, Denver CO 80301-1697",
      email: "therock@hotmail.com",
      strideLength: 10,
      dailyStepGoal: 60000,
      friends: [1, 2, 4]
    });

    const user4 = new User({
      id: 4,
      name: "Rainbow Dash",
      address: "1237 Equestria Street, Denver CO 80301-1697",
      email: "rainbowD1@hotmail.com",
      strideLength: 3.8,
      dailyStepGoal: 7000,
      friends: [1, 2, 3]
    });
    const users = [user3, user4];
    const userRepo = new UserRepo(users);
    expect(hydration.calculateRandomWeekOunces('2019/09/18', 4, userRepo)[0]).to.eql('2019/09/18: 40');
    // expect(hydration.calculateRandomWeekOunces('2018/02/01', 4, userRepo)[6]).to.eql('2019/09/16: 30');
    //this is failing because it doesn't exist, need a failure case
  })
  //day of hydration should not include user 2 or user 1 on August 22
  //week of hydration should not include user 4 not during the week

});
