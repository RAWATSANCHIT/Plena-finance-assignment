import { Test, TestingModule } from '@nestjs/testing';
import { BlockController } from '../block/block.controller';
import { BlockService } from '../block/block.service';

describe('BlockController', () => {
  let blockController: BlockController;
  let blockService: BlockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlockController],
      providers: [
        {
          provide: BlockService,
          useValue: {
            blockUser: jest.fn(),
            unblockUser: jest.fn(),
            getBlockedUserIds: jest.fn(),
          },
        },
      ],
    }).compile();

    blockController = module.get<BlockController>(BlockController);
    blockService = module.get<BlockService>(BlockService);
  });

  it('should be defined', () => {
    expect(blockController).toBeDefined();
  });

});
