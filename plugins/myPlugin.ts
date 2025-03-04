export default defineNuxtPlugin(() => {
	return {
		sayHello: (msg: string) => console.log(msg),
	};
});
