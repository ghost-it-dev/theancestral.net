import { UserType } from './User';

export interface PostType {
	title: string;
	description: string;
	link?: string;
	tags: string[];
	authorID: UserType['_id'];
	updatedAt: Date;
	authorName: string;
	publicPost: boolean;
	_id: string;
}