import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Block } from '../schema/block-schema';
import { BlockUserDto } from '../schema/dto/block.dto';

@Injectable()
export class BlockService {
  constructor(@InjectModel('Block') private readonly blockModel: Model<Block>) {}

  async block(blockUserDto: BlockUserDto): Promise<Block> {
    const newBlock = new this.blockModel(blockUserDto);
    return await newBlock.save();
  }

  async unblock(blockUserDto: BlockUserDto): Promise<void> {
    await this.blockModel.findOneAndDelete(blockUserDto).exec();
  }

  async getBlockedUserIds(userId: string): Promise<string[]> {
    const blocks = await this.blockModel.find({ userId }).exec();
    return blocks.map(block => block.blockedUserId);
  }
}