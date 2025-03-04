export default defineEventHandler(() => {
	return {
		message: "Hello, world!",
		timestamp: Date.now(),
		status: 200,
	};
});
