import { Request, Response } from 'express';
import { handleLogin } from './loginController';
import { getUser } from '../../services/auth/getUser';
import { json } from 'express';

// mock db connection
jest.mock('../../config/db-connection', () => {
  return {};
});

// make mock db getUser call
jest.mock('../../services/auth/getUser');

describe('handleLogin', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {
      body: {},
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    jest.clearAllMocks();
  });

  it('should send 400 if password too short', async () => {
    mockRequest.body = { user_name: 'testuser', password: '2short' };

    await handleLogin(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'password too short',
    });
    expect(getUser).not.toHaveBeenCalled();
  });

  it('should send 201 status is login successful', async () => {
    mockRequest.body = { user_name: 'testuser', password: 'validpassword' };

    const mockUserTokenInfo = { token: 'jwt-token', user_name: 'testuser' };
    (getUser as jest.Mock).mockResolvedValue(mockUserTokenInfo);

    await handleLogin(mockRequest as Request, mockResponse as Response);

    expect(getUser).toHaveBeenCalledWith(mockRequest.body);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.send).toHaveBeenCalledWith(mockUserTokenInfo);
  });

  it('should send 500 status is server error happens', async () => {
    mockRequest.body = { user_name: 'testuser', password: 'validpassword' };
    (getUser as jest.Mock).mockRejectedValue(new Error('failed in db'));

    await handleLogin(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Login failed',
      error: expect.any(Error),
    });
  });
});
