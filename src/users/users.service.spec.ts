import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  const prismaMock = {
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(() => {
    service = new UsersService(prismaMock as any);
    jest.clearAllMocks();
  });

  it('hashes password on create and omits password from response', async () => {
    const fakeUser = {
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
      password: 'hashed_password',
      role: 'user',
      createdAt: new Date(),
      accounts: [],
    };

    prismaMock.user.create.mockResolvedValue(fakeUser);

    const result = await service.create({
      name: 'Alice',
      email: 'alice@example.com',
      password: 'plain-secret-123',
      role: 'user',
    });

    expect(prismaMock.user.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          password: expect.any(String),
        }),
      }),
    );
    expect(prismaMock.user.create.mock.calls[0][0].data.password).not.toBe(
      'plain-secret-123',
    );
    expect(result).not.toHaveProperty('password');
  });

  it('does not expose password in findAll response', async () => {
    const fakeUsers = [
      {
        id: 1,
        name: 'Alice',
        email: 'alice@example.com',
        password: 'secret',
        role: 'user',
        createdAt: new Date(),
        accounts: [],
      },
    ];

    prismaMock.user.findMany.mockResolvedValue(fakeUsers);

    const result = await service.findAll();

    expect(result[0]).not.toHaveProperty('password');
  });
});
