import { expect } from 'chai';
import  testData  from './sampleData';
import UserRepo from '../src/classes/User-repo';
import User from '../src/classes/User';

describe('User Repo', () => {
  let user1, user2, user3, user4, user5, users, userRepo, hydrationData, sleepData;

  beforeEach(() => {
    user1 = new User(testData.repoTwoUsers[0]);
    user2 = new User(testData.repoTwoUsers[1]);
    user3 = new User(testData.repoTwoUsers[2]);
    user4 = new User(testData.repoTwoUsers[3]);
    user5 = new User(testData.repoTwoUsers[4]);
    users = [user1, user2, user3, user4, user5];
    userRepo = new UserRepo(users);
    hydrationData = testData.repoTwoHydration
    sleepData = testData.repoTwoSleep
  });


  it('should be a function', function() {

    expect(UserRepo).to.be.a('function');
  });

  it('should be an instance of a user repository', () => {

    expect(userRepo).to.be.an.instanceof(UserRepo);
  });

  it('takes an array of user data', () => {

    expect(userRepo.users).to.include(user2);
  });

  it('should have a parameter to take in user data', () => {

    expect(userRepo.users[0].id).to.equal(1);
  });

  it('should return user data when given user ID', () => {
    userRepo.getDataFromID(1);

    expect(userRepo.getDataFromID(1)).to.equal(user1);
  });

  it('should return the average of all users step goals', () => {
    userRepo.calculateAverageStepGoal();

    expect(userRepo.calculateAverageStepGoal()).to.equal(18600);
  });


    it('should get a users data from its userID in any data set', () => {
      expect(userRepo.getDataFromUserID(1, hydrationData)).to.eql([{
          "userID": 1,
          "date": "2019/06/15",
          "numOunces": 37
        },
        {
          "userID": 1,
          "date": "2018/06/16",
          "numOunces": 39
        },
        {
          "userID": 1,
          "date": "2016/08/22",
          "numOunces": 30
        }
      ]);
    });

    it('should get a users most recent date using the app', () => {
      expect(userRepo.getToday(4, hydrationData)).to.equal("2019/09/20");
    });

    it('should sort data by date and extract its week', () => {

      expect(userRepo.getFirstWeek(4, hydrationData)[3].date).to.equal("2019/09/17");
    });

    it('should get a sorted week of data for a single user from a date', () => {
      expect(userRepo.getWeekFromDate('2019/09/17', 4, hydrationData)[3].date).to.equal("2019/04/15");
      expect(userRepo.getWeekFromDate('2019/09/18', 4, hydrationData)[3].date).to.equal("2019/09/15");
    });

    it('should get a week of data for all users in data set', () => {
      expect(userRepo.chooseWeekDataForAllUsers(hydrationData, '2019/09/17')[2].date).to.equal("2019/09/15");
      expect(userRepo.chooseWeekDataForAllUsers(hydrationData, '2019/09/17')[2].userID).to.equal(4);
      expect(userRepo.chooseWeekDataForAllUsers(hydrationData, '2019/09/17')[3].date).to.equal("2019/09/17");
      expect(userRepo.chooseWeekDataForAllUsers(hydrationData, '2019/09/17')[3].userID).to.equal(3);
    });

    it('should get a day of data for all users in data set', () => {
      expect(userRepo.chooseDayDataForAllUsers(sleepData, '2019/06/15')[0].date).to.equal('2019/06/15');
      expect(userRepo.chooseDayDataForAllUsers(sleepData, '2019/06/15')[0].hoursSlept).to.equal(9);
      expect(userRepo.chooseDayDataForAllUsers(sleepData, '2019/06/15')[2].date).to.equal('2019/06/15');
      expect(userRepo.chooseDayDataForAllUsers(sleepData, '2019/06/15')[2].userID).to.equal(5);
    });

    it('should isolate a user ID and its values of any relevant data', () => {
      expect(userRepo.isolateUsernameAndRelevantData(sleepData, "2019/06/21", 'sleepQuality', userRepo.chooseWeekDataForAllUsers(sleepData, "2019/06/21"))).to.deep.equal(
        {
        '2': [3.5, 4, 3.3, 3.6, 3.6, 4, 3.1],
        '4': [3.5, 4, 1.3, 1.6, 1.6, 1, 3.1],
        '5': [4, 4, 4, 4, 4, 4, 4],
        '6': [4, 4]
        })
      expect(userRepo.isolateUsernameAndRelevantData(hydrationData, "2019/05/09", 'numOunces', userRepo.chooseWeekDataForAllUsers(hydrationData, "2019/05/09"))).to.deep.equal(
        { '3': [1] }
      )
    });

    it('should rank user ids according to relevant data value averages', () => {

      expect(userRepo.rankUserIDsbyRelevantDataValue(sleepData, "2019/06/21", 'sleepQuality', userRepo.chooseWeekDataForAllUsers(sleepData, "2019/06/21"))).to.deep.equal(
        ['5', '6', '2', '4']
      )
    });

    it('should show list in order of userID and average of relevant value', () => {

      expect(userRepo.combineRankedUserIDsAndAveragedData(sleepData, "2019/06/21", 'sleepQuality', userRepo.chooseWeekDataForAllUsers(sleepData, "2019/06/21"))[0]).to.deep.equal(
        { '5': 4 }
       )
    });
  });
