import { Injectable } from '@nestjs/common';
import { CreateItemDto } from '../dto/items/create-item.dto';
import { UpdateItemDto } from '../dto/items/update-item.dto';
import { ItemEntity } from '../entities/item.entity';
import { PrismaService } from '../../prisma/prisma.service';
import { Status } from '@prisma/client/catalog';
import { SlugExistsException } from '../exceptions/slug-exists.exception';
import { NotFoundException } from '../exceptions/not-found.exception';

@Injectable()
export class VariantsService {
  constructor(private prisma: PrismaService) {}
}
