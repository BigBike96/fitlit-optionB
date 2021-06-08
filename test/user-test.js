import { expect } from 'chai';

import UserRepo from '../src/User-repo';
import User from '../src/User';
import  userTestData  from './sampleData'

describe('User', () => {
  let user1, user2, user3, user4, users;

  beforeEach(() => {
    console.log(userTestData);
    user1 = new User(userTestData[0]);
    user2 = new User(userTestData[1]);
    user3 = new User(userTestData[2]);
    user4 = new User(userTestData[3]);

    users = [user1, user2, user3, user4];
  });

  it('should be a function', () => {

    expect(User).to.be.a('function');
  });

  it('should be an instance of User', () => {

    expect(user1).to.be.an.instanceof(User);
  });

  it('should have a user name', () => {

    expect(user1.name).to.equal("Alex Roth");
  });

  it('should have a different user name', () => {

    expect(user2.name).to.equal("Allie McCarthy");
  });

  it('should have an id', () => {

    expect(user1.id).to.equal(1);
  });

  it('should have a user address', () => {

    expect(user1.address).to.equal('1234 Turing Street, Denver CO 80301-1697');
  });

  it('should have a user email', () => {

    expect(user1.email).to.equal('alex.roth1@hotmail.com');
  });

  it('should have a user stride length', () => {

    expect(user1.strideLength).to.equal(4.3);
  });

  it('should have a user daily step goal', () => {

    expect(user4.dailyStepGoal).to.equal(7000);
  });

  it('should have an array of friend id numbers', () => {

    expect(user3.friends).to.deep.equal([1, 2, 4]);
  });

  it('should return user first name', () => {

    expect(user2.getFirstName()).to.equal("Allie");
  });

  it('should return a different user first name', () => {

    expect(user4.getFirstName()).to.equal("Rainbow");
  });

  it('should return list of friend names from user repository', () => {
    const userRepo = new UserRepo(users);

    expect(user2.getFriendsNames(userRepo)).to.deep.equal(['Alex Roth', 'The Rock', 'Rainbow Dash']);
  });
});
