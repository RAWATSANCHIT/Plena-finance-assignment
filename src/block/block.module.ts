import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlockController } from './block.controller';
import { BlockService } from './block.service';
import { BlockSchema } from '../schema/block-schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Block', schema: BlockSchema }]),
  ],
  controllers: [BlockController],
  providers: [BlockService],
})
export class BlockModule {}
