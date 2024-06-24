import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from '../schema/user-schema';
import { CacheModule } from '@nestjs/cache-manager';
import { BlockService } from '../block/block.service';
import { BlockSchema } from '../schema/block-schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Block', schema: BlockSchema }]),
    CacheModule.register({
      ttl: 300, // Cache for 5 minutes
    }),
  ],
  controllers: [UserController],
  providers: [UserService, BlockService],
})
export class UserModule {}
