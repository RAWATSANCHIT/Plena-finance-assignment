// user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schema/user-schema';
import { CreateUserDto, UpdateUserDto, SearchUserDto } from '../schema/dto/user.dto';
import { Cache } from 'cache-manager';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { BlockService } from '../block/block.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly blockService: BlockService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return await newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const cachedUser = await this.cacheManager.get<User>(`user-${id}`);
    if (cachedUser) return cachedUser;

    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    await this.cacheManager.set(`user-${id}`, user, 300);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    if (!updatedUser) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    await this.cacheManager.set(`user-${id}`, updatedUser, 300);
    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (result) {
      await this.cacheManager.del(`user-${id}`);
    } else {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
  }

  async search(searchUserDto: SearchUserDto, userId: string): Promise<User[]> {
    const blockedUserIds = await this.blockService.getBlockedUserIds(userId);
    const query = this.userModel.find().where('_id').nin(blockedUserIds);

    if (searchUserDto.username) {
      query.where('username').regex(new RegExp(searchUserDto.username, 'i'));
    }
    if (searchUserDto.minAge || searchUserDto.maxAge) {
      const now = new Date();
      if (searchUserDto.minAge) {
        const minBirthdate = new Date(now.getFullYear() - searchUserDto.minAge, now.getMonth(), now.getDate());
        query.where('birthdate').lte(minBirthdate as any);
      }
      if (searchUserDto.maxAge) {
        const maxBirthdate = new Date(now.getFullYear() - searchUserDto.maxAge, now.getMonth(), now.getDate());
        query.where('birthdate').gte(maxBirthdate as any);
      }
    }
    return await query.exec();
  }
  
}

