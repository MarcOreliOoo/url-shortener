import { Test, TestingModule } from '@nestjs/testing';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { PrismaService } from '../prisma.service';

describe('UrlController', () => {
	let controller: UrlController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UrlController],
			providers: [UrlService, PrismaService],
		}).compile();

		controller = module.get<UrlController>(UrlController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
