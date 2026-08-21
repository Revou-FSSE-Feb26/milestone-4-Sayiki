import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const prismaMock = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };
  const jwtMock = {
    sign: jest.fn().mockReturnValue('token-123'),
  };

  beforeEach(() => {
    service = new AuthService(
      prismaMock as any,
      jwtMock as unknown as JwtService,
    );
    jest.clearAllMocks();
  });

  it('registers a user and hashes the password', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);
    prismaMock.user.create.mockResolvedValue({
      id: 1,
      email: 'user@example.com',
      name: 'User',
      password: 'hashed_password',
      role: 'user',
      createdAt: new Date(),
    });

    const result = await service.register({
      name: 'User',
      email: 'user@example.com',
      password: 'plain-secret',
    });

    expect(prismaMock.user.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          password: expect.any(String),
        }),
      }),
    );
    expect(prismaMock.user.create.mock.calls[0][0].data.password).not.toBe(
      'plain-secret',
    );
    expect(result.access_token).toBe('token-123');
  });
});
