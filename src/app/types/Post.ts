import { UserTypes } from './User';

export interface Post {
	title: string;
	description: string;
	link?: string;
	tags: string[];
	authorID: UserTypes['_id'];
	updatedAt: Date;
	authorName: string;
	publicPost: boolean;
	_id: string;
}