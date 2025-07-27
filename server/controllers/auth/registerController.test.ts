import { insertUser } from '../../services/auth/insertUser';
import { Request, Response } from 'express';
import { handleRegister, newUser } from './registerController';

// make mocks
jest.mock('../../config/db-connection', () => {
  return {};
});

jest.mock('../../services/auth/insertUser');

describe('handleRegister', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {
      body: {},
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });
  it('should send 400 and error message if password too short', async () => {
    mockRequest.body = {
      user_name: 'testuser',
      password: '2short',
      email: 'testuser@email.com',
    } as newUser;

    await handleRegister(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalledWith({
      error: 'password too short',
    });
    expect(insertUser).not.toHaveBeenCalled();
  });

  it('should send 400 and error message if @ not in email', async () => {
    mockRequest.body = {
      user_name: 'testuser',
      password: 'validpassword',
      email: 'testuseremail.com',
    } as newUser;

    await handleRegister(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalledWith({
      error: 'Invalid email',
    });
    expect(insertUser).not.toHaveBeenCalled();
  });

  it('should send 201 if valid registration inputs', async () => {
    mockRequest.body = {
      user_name: 'testuser',
      email: 'valid@email.com',
      password: 'validpassword',
    } as newUser;

    const newUserInfo: newUser = mockRequest.body;
    (insertUser as jest.Mock).mockResolvedValue(newUserInfo);

    await handleRegister(mockRequest as Request, mockResponse as Response);

    expect(insertUser).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.send).toHaveBeenCalledWith(newUserInfo);
  });

  it('should send 501 if error occurs with registration', async () => {
    mockRequest.body = {
      user_name: 'testuser',
      email: 'valid@email.com',
      password: 'validpassword',
    } as newUser;

    const newUserInfo: newUser = mockRequest.body;
    (insertUser as jest.Mock).mockRejectedValue(
      new Error('error with registering')
    );

    await handleRegister(mockRequest as Request, mockResponse as Response);

    expect(insertUser).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(501);
    expect(mockResponse.send).toHaveBeenCalledWith({
      message: 'registration failed',
      error: expect.any(Error),
    });
  });
});
