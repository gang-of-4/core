import { Injectable, NotFoundException } from '@nestjs/common';
import { decodeToken } from 'common/shared.utils';
import { PrismaService } from '../../prisma/prisma.service';
import { S3Service } from '../../aws/services/s3.service';
import * as crypto from 'crypto';
import { MediaEntity } from '../entities/media.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MediaService {
  constructor(
    private prisma: PrismaService,
    private s3Service: S3Service,
    private config: ConfigService,
  ) {}

  async findOne(id: string) {
    const media = await this.prisma.media
      .findUniqueOrThrow({
        where: {
          id,
        },
      })
      .catch(() => {
        throw new NotFoundException();
      });

    return new MediaEntity({
      ...media,
      url: `${this.config.get('AWS_S3_URL')}/${media.ownerId}/${media.name}`,
    });
  }

  async create(file: Express.Multer.File, access_token: string) {
    const { user } = await decodeToken(access_token);

    const extension: string = file.originalname.split('.').pop().toLowerCase();
    const name: string = `${crypto.randomUUID()}.${extension}`;
    const ownerId: string = user?.id ?? 'guest';

    await this.s3Service.upload(file, name, ownerId);
    const media = await this.prisma.media.create({
      data: {
        name: name,
        ownerId: user?.id ?? 'guest',
        size: file.size,
        extension: extension,
      },
    });

    return new MediaEntity({
      ...media,
      url: `${this.config.get('AWS_S3_URL')}/${ownerId}/${name}`,
    });
  }
}
