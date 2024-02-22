import { Test, TestingModule } from '@nestjs/testing';
import { UrlService } from './url.service';
import { PrismaService } from '../prisma.service';

describe('UrlService', () => {
	let urlService: UrlService;
	let prismaService: PrismaService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UrlService, PrismaService],
		}).compile();

		urlService = module.get<UrlService>(UrlService);
		prismaService = module.get<PrismaService>(PrismaService);
	});

	it('should be defined', () => {
		expect(urlService).toBeDefined();
	});

	it('should shorten an URL', async () => {
		const url = await urlService.shorten({ url: 'https://www.google.com' });
		expect(url.longUrl).toBe('https://www.google.com');
		expect(url.shortUrl).toBeDefined();
	});

	it('should redirect to an URL', async () => {
		const url = await urlService.shorten({ url: 'https://www.google.com' });
		const longUrl = await urlService.redirect(url.shortUrl);
		expect(longUrl).toBe('https://www.google.com');
	});

	it('should throw an error when redirecting to an unknown URL', async () => {
		await expect(urlService.redirect('unknown')).rejects.toThrow();
	});

	it('should throw an error if there is collusion with same shortUrl', async () => {
		const url = await urlService.shorten({ url: 'https://www.google.com' });
		await expect(
			prismaService.url.create({
				data: {
					longUrl: 'https://www.google.com',
					shortUrl: url.shortUrl,
				},
			}),
		).rejects.toThrow();
	});
});
