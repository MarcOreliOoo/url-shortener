import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { nanoid } from 'nanoid';
import { PrismaService } from '../prisma.service';
import { Url } from '@prisma/client';

/**
 * Service for URL operations
 * TODO: change db for a real one
 * TODO: if a relational one is picked, think about partitionning from the frist char of the Nanoid obtain [A-H, I-P, Q-Z, 0-9, a-h...] / if NoSQL, think about sharding (mongoDb got already a built-in sharding system)
 * TODO: add a cache layer like Redis to avoid hitting the db for every request. Maybe store in it the current address hitten and/or the famous addresses (like companies or celebrities... etc)
 */

@Injectable()
export class UrlService {
	constructor(private prisma: PrismaService) {}

	/**
	 * Create a new short URL
	 * @param createUrlDto
	 * @returns the URL object
	 */
	async shorten(createUrlDto: CreateUrlDto): Promise<Url> {
		const shortUrl = nanoid(6);
		const url = await this.findOne(shortUrl);
		if (url) throw new ConflictException('Collusion detected, try again!');

		return await this.prisma.url.create({
			data: {
				longUrl: createUrlDto.url,
				shortUrl,
			},
		});
	}

	/**
	 * Redirect to the long URL
	 * @param shortUrl short URL
	 * @returns the long original URL
	 */
	async redirect(shortUrl: string): Promise<string> {
		const url = await this.findOne(shortUrl);
		if (!url) {
			throw new NotFoundException('URL not found');
		}
		return url.longUrl;
	}

	/**
	 * Find unique URL in Db
	 * @param shortUrl
	 * @returns the URL found or null
	 */
	async findOne(shortUrl: string): Promise<Url | null> {
		return await this.prisma.url.findUnique({
			where: {
				shortUrl,
			},
		});
	}
}
