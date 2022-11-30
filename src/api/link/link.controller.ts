import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { LinkService } from './link.service';
import { LinkDto } from './dto/link.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Link')
@Controller('api/link/')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @ApiBody({ type: LinkDto })
  @Post('create')
  shortenLink(@Body() linkDto: LinkDto) {
    return this.linkService.createShortenLink(linkDto);
  }

  @Get(':shortcode')
  async redirect(@Res() res, @Param('shortcode') shortcode: string) {
    const url = await this.linkService.redirect(shortcode);

    return res.redirect(url.link);
  }
}
