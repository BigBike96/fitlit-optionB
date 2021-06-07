import { expect } from 'chai';

import UserRepo from '../src/User-repo';
import User from '../src/User';

describe('User', () => {
  let user1, user2, user3, user4, users;

  beforeEach(() => {
    user1 = new User({
      id: 1,
      name: "Alex Roth",
      address: "1234 Turing Street, Denver CO 80301-1697",
      email: "alex.roth1@hotmail.com",
      strideLength: 4.3,
      dailyStepGoal: 10000,
      friends: [2, 3, 4]
    });
    user2 = new User({
      id: 2,
      name: "Allie McCarthy",
      address: "1235 Turing Street, Denver CO 80301-1697",
      email: "allie.mcc1@hotmail.com",
      strideLength: 3.3,
      dailyStepGoal: 9000,
      friends: [1, 3, 4]
    });
    user3 = new User({
      id: 3,
      name: "The Rock",
      address: "1236 Awesome Street, Denver CO 80301-1697",
      email: "therock@hotmail.com",
      strideLength: 10,
      dailyStepGoal: 60000,
      friends: [1, 2, 4]
    });
    user4 = new User({
      id: 4,
      name: "Rainbow Dash",
      address: "1237 Equestria Street, Denver CO 80301-1697",
      email: "rainbowD1@hotmail.com",
      strideLength: 3.8,
      dailyStepGoal: 7000,
      friends: [1, 2, 3]
    });

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

    expect(user2.id).to.equal(2);
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

  it('should return user first name', () => {

    expect(user2.getFirstName()).to.equal("Allie");
  });

  it('should return list of friend names from user repository', () => {
    const userRepo = new UserRepo(users);

    console.log(user2.getFriendsNames(userRepo));
    expect(user2.getFriendsNames(userRepo)).to.deep.equal(['Alex Roth', 'The Rock', 'Rainbow Dash']);
  });
});
