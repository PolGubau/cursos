export const useUtils = () => {
	const sayHello = () => {
		console.log("Hello from the home page!");
	};

	return {
		sayHello,
	};
};
