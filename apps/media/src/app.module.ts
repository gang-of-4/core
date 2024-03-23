import { Module } from '@nestjs/common';
import { MediaModule } from './media/media.module';
import { PrismaModule } from './prisma/prisma.module';
import { AwsSdkModule } from 'nest-aws-sdk';
import { AwsModule } from './aws/aws.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    MediaModule,
    AwsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        useFactory: (cs: ConfigService) => {
          return {
            region: 'us-east-1',
            credentials: {
              accessKeyId: cs.get('AWS_ACCESS_KEY_ID'),
              secretAccessKey: cs.get('AWS_SECRET_ACCESS_KEY'),
            },
          };
        },
        imports: [ConfigModule],
        inject: [ConfigService],
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
