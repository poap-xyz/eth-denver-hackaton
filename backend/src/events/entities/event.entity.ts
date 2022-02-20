import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'events' })
export class EventEntity {
  @PrimaryColumn({ name: 'id' })
  _id: number;

  @Column({ name: 'fancy_id', nullable: false })
  fancyId: string;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'country', nullable: true })
  country: string;

  @Column({ name: 'city', nullable: true })
  city: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'event_url', nullable: true })
  eventUrl: string;

  @Column({ name: 'private_event', default: false })
  privateEvent: boolean;

  @Column({ name: 'virtual_event', default: false })
  virtualEvent: boolean;

  @Column({ name: 'image_url', nullable: false })
  imageURL: string;

  @Column({ name: 'animation_url', nullable: true })
  animationURL: string;

  @Column({ name: 'year', nullable: true })
  year: number;

  @Column({ name: 'start_date', nullable: false })
  startDate: Date;

  @Column({ name: 'end_date', nullable: false })
  endDate: Date;

  @Column({ name: 'created_date' })
  createdDate: Date;
}
