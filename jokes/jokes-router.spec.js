const request = require('supertest'); 
const server = require('../api/server.js');
const db = require('../database/dbConfig.js');
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');
const secrets = require('../config/secrets.js');

describe('jokes-router.js',()=>{
  beforeEach(async () => {
    await db('users').truncate();
  });
  describe('GET /',()=>{
    it('should return status 400 without a token', async ()=>{
      const res = await request(server).get("/api/jokes");
      expect(res.status).toEqual(400);
    });
    it('should return status 200 with a token', async ()=>{
      await request(server).post('/api/auth/register')
      .send( {username:"john",password:"123"} );
    
      const login = await request(server).post('/api/auth/login')
      .send( {username:"john",password:"123"} );
      
      const res = await request(server).get("/api/jokes").set('authorization', login.body.token);

      expect(res.status).toEqual(200);
    });
  })
})