import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsController } from '../controllers/permissions.controller';
import { PermissionsService } from '../services/permissions.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { RolesController } from '../controllers/roles.controller';
import { RolesService } from '../services/roles.service';

describe('RolesService', () => {
  let service: RolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [RolesController, PermissionsController],
      providers: [RolesService, PermissionsService],
      exports: [RolesService],
    }).compile();

    service = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
