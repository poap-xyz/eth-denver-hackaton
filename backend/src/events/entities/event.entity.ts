import { Post } from '../../posts/entities/post.entity';

export class Event {
  id: number;
  fancyId: string;
  name: string;
  country: string;
  city: string;
  description: string;
  eventUrl: string;
  privateEvent: boolean;
  virtualEvent: boolean;
  imageURL: string;
  animationURL: string;
  year: number;
  startDate: Date;
  endDate: Date;
  createdDate: Date;
  posts: Post[];
}
