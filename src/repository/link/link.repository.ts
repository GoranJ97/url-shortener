import { DataSource, Repository } from 'typeorm';
import { Link } from '../../entity/link/link.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LinkRepository extends Repository<Link> {
  constructor(private dataSource: DataSource) {
    super(Link, dataSource.createEntityManager());
  }
}
