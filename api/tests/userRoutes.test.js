import { updateUser, deleteUser } from '../controllers/user.controller.js';
import User from '../models/user.js';
import bcryptjs from 'bcryptjs';
import { describe, it, expect, vi } from 'vitest';

vi.mock('../models/user.js');
vi.mock('bcryptjs');
vi.mock('../utils/error.js');
vi.mock('../utils/error.js', () => ({
  errorHandler: vi.fn((statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
  }),
}));

// updateUser Test
describe('updateUser', () => {
  it('should update the user information when the user is authorized', async () => {
    const req = {
      user: { id: 'user123' },
      params: { id: 'user123' },
      body: {
        username: 'newUsername',
        email: 'newEmail@example.com',
        password: 'newPassword',
        profilePic: 'newPic.jpg',
      },
    };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    const next = vi.fn();

    // Mock bcryptjs hashSync
    bcryptjs.hashSync.mockReturnValue('hashedPassword');

    // Mock User.findByIdAndUpdate to return a mocked user object
    User.findByIdAndUpdate.mockResolvedValue({
      _doc: {
        username: 'newUsername',
        email: 'newEmail@example.com',
        profilePic: 'newPic.jpg',
        password: 'hashedPassword',
      },
    });

    await updateUser(req, res, next);

    expect(bcryptjs.hashSync).toHaveBeenCalledWith('newPassword', 10);
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      'user123',
      {
        $set: {
          username: 'newUsername',
          email: 'newEmail@example.com',
          password: 'hashedPassword',
          profilePic: 'newPic.jpg',
        },
      },
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      username: 'newUsername',
      email: 'newEmail@example.com',
      profilePic: 'newPic.jpg',
    });
    expect(next).not.toHaveBeenCalled();
  });
});

// deleteUser Test
describe('deleteUser', () => {
  it('should delete the user when the user is authorized', async () => {
    const req = {
      user: { id: 'user123' },
      params: { id: 'user123' },
    };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    const next = vi.fn();

    // Mock User.findByIdAndDelete to resolve successfully
    User.findByIdAndDelete.mockResolvedValue();

    await deleteUser(req, res, next);

    expect(User.findByIdAndDelete).toHaveBeenCalledWith('user123');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith('User has been deleted...');
    expect(next).not.toHaveBeenCalled();
  });
});