import { UserType } from './User';

export interface PostType {
  title: string;
  description: string;
  link?: string;
  tags: string[];
  authorId: UserType['_id'];
  updatedAt: Date;
  authorName: string;
  publicPost: boolean;
  _id: string;
}
