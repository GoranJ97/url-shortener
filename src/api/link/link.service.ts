import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LinkRepository } from '../../repository/link/link.repository';
import { LinkDto } from './dto/link.dto';
import { ErrorResponseService } from '../../common/service/error-response.service';
import { nanoid } from 'nanoid';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(LinkRepository)
    private readonly linkRepository: LinkRepository,
    private readonly errorResponseService: ErrorResponseService,
  ) {}

  async createShortenLink(linkDto: LinkDto) {
    const { link } = linkDto;
    const shortcode = nanoid(5);
    const baseURL = 'http://localhost:3333';

    try {
      let url = await this.linkRepository.findOneBy({ link });
      if (url) return url.shortLink;

      const shortLink = `${baseURL}/${shortcode}`;

      url = this.linkRepository.create({
        shortcode,
        link,
        shortLink,
      });

      await this.linkRepository.save(url);
      return url.shortLink;
    } catch (err) {
      this.errorResponseService.throwError(err);
    }
  }

  async redirect(shortcode: string) {
    try {
      const url = await this.linkRepository.findOneBy({ shortcode });
      if (url) return url;
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
