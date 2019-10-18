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

      await Auth.add({ username: 'Danny', password:'123' });

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
});