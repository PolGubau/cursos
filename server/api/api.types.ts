export interface PostsResponse {
	posts: Post[];
	total: number;
	skip: number;
	limit: number;
}

export interface Post {
	id: number;
	title: string;
	body: string;
	tags: string[];
	reactions: Reactions;
	views: number;
	userId: number;
}

interface Reactions {
	likes: number;
	dislikes: number;
}
