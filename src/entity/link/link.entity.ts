import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Link extends BaseEntity {
  constructor(partial: Partial<Link>) {
    super();
    Object.assign(this, partial);
  }
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  link: string;

  @Column()
  shortcode: string;

  @Column()
  shortLink: string;
}
