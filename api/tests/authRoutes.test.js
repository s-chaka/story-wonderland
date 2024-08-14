import { describe, it, expect, vi } from 'vitest';
import { signup, signin, google, signout, getUserId } from '../controllers/auth.controller.js';
import User from '../models/user.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

vi.mock('../models/user.js'); // Mocking the User model
vi.mock('bcryptjs'); // Mocking bcryptjs
vi.mock('jsonwebtoken'); // Mocking jsonwebtoken

describe('Auth Controller', () => {
  describe('signup', () => {
    it('should create a new user and return success message', async () => {
      const req = {
        body: {
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
        },
      };
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };
      const next = vi.fn();

      const hashedPassword = 'hashedpassword';
      bcryptjs.hashSync.mockReturnValue(hashedPassword);
      User.prototype.save = vi.fn().mockResolvedValueOnce();

      await signup(req, res, next);

      expect(User).toHaveBeenCalledWith({ username: 'testuser', email: 'test@example.com', password: hashedPassword });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith('User created successfully!');
      expect(next).not.toHaveBeenCalled();
    });
  });


  describe('google', () => {
    it('should sign in an existing user with Google and return a token', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          name: 'Test User',
          photo: 'http://example.com/photo.jpg',
        },
      };
      const res = {
        cookie: vi.fn().mockReturnThis(),
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };
      const next = vi.fn();

      const mockUser = {
        _id: 'userId123',
        password: 'hashedpassword',
        _doc: { email: 'test@example.com', username: 'testuser' },
      };

      User.findOne.mockResolvedValue(mockUser);
      jwt.sign.mockReturnValue('token123');

      await google(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(jwt.sign).toHaveBeenCalledWith({ id: 'userId123' }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
      expect(res.cookie).toHaveBeenCalledWith('access_token', 'token123', expect.any(Object));
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ email: 'test@example.com', username: 'testuser' });
      expect(next).not.toHaveBeenCalled();
    });
  });


  describe('signout', () => {
    it('should sign out the user and clear the access token', async () => {
      const req = {};
      const res = {
        clearCookie: vi.fn(),
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };
      const next = vi.fn();

      await signout(req, res, next);

      expect(res.clearCookie).toHaveBeenCalledWith('access_token');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith('Signout successful!');
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('getUserId', () => {
    it('should return the user ID from a valid token', async () => {
      const req = {
        cookies: {
          access_token: 'token123',
        },
      };
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };
      const next = vi.fn();

      jwt.verify.mockReturnValue({ id: 'userId123' });

      await getUserId(req, res);

      expect(jwt.verify).toHaveBeenCalledWith('token123', process.env.JWT_SECRET_KEY);
      expect(res.json).toHaveBeenCalledWith({ userId: 'userId123' });
      expect(res.status).not.toHaveBeenCalledWith(500);
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 if no token is provided', async () => {
      const req = {
        cookies: {},
      };
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };
      const next = vi.fn();

      await getUserId(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 500 if token verification fails', async () => {
      const req = {
        cookies: {
          access_token: 'invalidtoken',
        },
      };
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };
      const next = vi.fn();

      jwt.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      await getUserId(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
      expect(next).not.toHaveBeenCalled();
    });
  });
});