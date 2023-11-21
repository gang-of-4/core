import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { RolesModule } from '../../roles/roles.module';
import { RoleExistsRule } from '../rules/role-exist.rule';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let prisma: PrismaService;
  let defaultUser;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, RolesModule],
      controllers: [UsersController],
      providers: [UsersService, RoleExistsRule],
      exports: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    prisma = module.get<PrismaService>(PrismaService);
    prisma.$connect();

    defaultUser = {
      firstName: 'example',
      lastName: 'example',
      email: 'users@controller.com',
      phone: '+966500000001',
      roleId: (
        await prisma.role.findFirst({
          where: {
            name: {
              not: 'admin',
            },
          },
          select: {
            id: true,
          },
        })
      ).id,
    };
  });

  afterEach(async () => {
    await prisma.user.deleteMany({
      where: {
        email: defaultUser.email,
      },
    });
    await prisma.$disconnect();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('prisma should be defined', async () => {
    expect(prisma).toBeDefined();
  });

  it('should create a user', async () => {
    const user = await controller.create(new CreateUserDto(defaultUser));

    expect(user).toBeInstanceOf(UserEntity);
    expect(user).toEqual(expect.objectContaining(defaultUser));
  });

  it('should find a user by id', async () => {
    const createdUser = await controller.create(new CreateUserDto(defaultUser));
    const user = await controller.findOne(createdUser.id);

    expect(user).toBeInstanceOf(UserEntity);
    expect(user).toEqual(expect.objectContaining(defaultUser));
  });

  it('should return array of users', async () => {
    await controller.create(new CreateUserDto(defaultUser));
    const users = await controller.findAll();

    expect(users).toBeInstanceOf(Array);
    expect(users.length).toBeGreaterThan(0);
  });
});
