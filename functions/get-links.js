async function getLinks(arrayMarkupStr, pathSelector) {
	try {
		const links = await Promise.all(
			await arrayMarkupStr.map(async (text) => {
				const $ = cheerio.load(text);
				const a = $(pathSelector)
					.toArray()
					.map((elm) => $(elm).attr('href'));

				return a;
			})
		);

		return links.flat(5);
	} catch (error) {
		console.log(error);
	}
}

export { getLinks };
