import type { PostsResponse } from "./api.types";
import data from "./posts.json";

export default defineEventHandler(() => {
	// return new Promise<PostsResponse>((resolve) => {
	// 	setTimeout(() => {
	// 		resolve(data);
	// 	}, 2000);
	// });
	return data as PostsResponse;
});
