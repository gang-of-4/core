import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';
import { RolesModule } from '../roles/roles.module';
import { RoleExistsRule } from './rules/role-exist.rule';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToInstance } from 'class-transformer';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;
  let defaultUser;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, RolesModule],
      controllers: [UsersController],
      providers: [UsersService, RoleExistsRule],
      exports: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
    prisma.$connect();

    defaultUser = {
      first_name: 'example',
      last_name: 'example',
      email: 'users@service.com',
      phone: '+966500000002',
      role_id: (
        await prisma.role.findFirst({
          select: {
            id: true,
          },
        })
      ).id,
    };
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('prisma should be defined', async () => {
    expect(prisma).toBeDefined();
  });

  it('should create a user', async () => {
    const user = await service.create(
      plainToInstance(CreateUserDto, defaultUser),
    );

    expect(user).toBeInstanceOf(UserEntity);
    expect(user).toEqual(expect.objectContaining(defaultUser));
  });

  it('should update a user', async () => {
    const user = await service.create(new CreateUserDto(defaultUser));

    const update = {
      ...defaultUser,
      first_name: 'updated',
      last_name: 'updated',
    };

    const updatedUser = await service.update(
      user.id,
      plainToInstance(UpdateUserDto, update),
    );

    expect(updatedUser).toBeInstanceOf(UserEntity);
    expect(updatedUser).toEqual(expect.objectContaining(update));
  });

  it('should find a user by id', async () => {
    const createdUser = await service.create(
      plainToInstance(CreateUserDto, defaultUser),
    );
    const user = await service.findOne(createdUser.id);

    expect(user).toBeInstanceOf(UserEntity);
    expect(user).toEqual(expect.objectContaining(defaultUser));
  });

  it('should delete a user by id', async () => {
    const createdUser = await service.create(
      plainToInstance(CreateUserDto, defaultUser),
    );
    const user = await service.remove(createdUser.id);

    const result = await service.findOne(createdUser.id);

    expect(result).toEqual({});
    expect(user).toBeInstanceOf(UserEntity);
    expect(user).toEqual(expect.objectContaining(defaultUser));
  });

  it('should return array of users', async () => {
    const user = await service.create(new CreateUserDto(defaultUser));
    const users = await service.findAll();

    expect(users).toBeInstanceOf(Array);
    expect(users.length).toBe(1);
    expect(users[0]).toEqual(user);
  });
});
