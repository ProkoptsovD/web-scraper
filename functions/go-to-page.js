async function goToPage(arrayURLs) {
	try {
		const pages = await Promise.all(
			arrayURLs.map(async (url) => await (await fetch(url)).text())
		);
		return pages.flat(5);
	} catch (error) {
		console.log(error);
	}
}

export { goToPage };
