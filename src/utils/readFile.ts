export const readFile = (file: File): Promise<string> => {
	console.log("file", file)
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

    	reader.onload = () => resolve(reader.result as string);

		reader.onerror = () => {
			reject(reader.error);
		};

		reader.readAsDataURL(file);
	});
};
