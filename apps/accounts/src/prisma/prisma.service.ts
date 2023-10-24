import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ulid } from 'ulidx';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$extends({
      query: {
        $allModels: {
          async create({ args, query }) {
            if ('id' in args.data) {
              args.data = {
                ...args.data,
                id: ulid(),
              };
            }

            return query(args);
          },
        },
      },
    }).$connect();
  }
}
