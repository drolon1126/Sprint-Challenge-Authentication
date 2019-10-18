const db = require('../database/dbConfig.js');

const Auth = require('./auth-model.js');

describe('auth-model', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });

  describe('add()', () => {
    it('should add user to db', async () => {
      let users = await db('users');
      expect(users).toHaveLength(0);

      await Auth.add({ username: 'danny', password:'123' });

      users = await db('users');
      expect(users).toHaveLength(1);
    });
    it('should add the provided user to db', async () => {
      let user = await Auth.add({ username: 'danny', password:'123' });
      expect(user.username).toBe('danny');
      expect(user.password).toBe('123');

      user = await Auth.add({ username: 'timmy', password:'abc' });
      expect(user.username).toBe('timmy');
      expect(user.password).toBe('abc');
    });
  });
  describe('find()', () => {
    it('should return the proper lists of users', async ()=>{
      await Auth.add({ username: 'danny', password:'123' });
      let users = await Auth.find();
      expect(users).toHaveLength(1);
      expect(users[0].username).toBe('danny');

      await Auth.add({ username: 'timmy', password:'123' });
      users = await Auth.find();
      expect(users).toHaveLength(2);
      expect(users[1].username).toBe('timmy');
    });
  });

  describe('findBy()', () => {
    it('should return the proper user by filter', async ()=>{
      await Auth.add({ username: 'danny', password:'123' });
      let user = await Auth.findBy({'username':'danny'}).first();
      expect(user.username).toBe('danny');

    });
  });

  describe('findById()', () => {
    it('should return the proper user by id', async ()=>{
      await Auth.add({ username: 'danny', password:'123' });
      let user = await Auth.findById(1);
      expect(user.username).toBe('danny');
    });
  });
});