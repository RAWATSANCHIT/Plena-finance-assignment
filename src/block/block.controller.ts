import { Controller, Post, Delete, Body } from '@nestjs/common';
import { BlockService } from './block.service';
import { BlockUserDto } from '../schema/dto/block.dto';

@Controller('block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Post('/block')
  async block(@Body() blockUserDto: BlockUserDto) {
    await this.blockService.block(blockUserDto);
    return {message: 'User Blocked successfully'}
  }

  @Delete('/unblock')
  async unblock(@Body() blockUserDto: BlockUserDto) {
    await this.blockService.unblock(blockUserDto);
    return { message: 'User unblocked successfully' };
  }
}