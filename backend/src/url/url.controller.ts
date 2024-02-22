import { Controller, Get, Post, Body, Param, Redirect } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';

@Controller()
export class UrlController {
	constructor(private readonly urlService: UrlService) {}

	@Post()
	async shorten(@Body() createUrlDto: CreateUrlDto) {
		return await this.urlService.shorten(createUrlDto);
	}

	@Get(':shortUrl')
	@Redirect()
	async redirect(@Param('shortUrl') shortUrl: string) {
		console.log('shortUrl', shortUrl);
		return {
			url: await this.urlService.redirect(shortUrl),
			statusCode: 301, //302 for temporary redirection
		};
	}
}
