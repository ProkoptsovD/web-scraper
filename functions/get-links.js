//================= npm packages ====================//
import * as cheerio from 'cheerio';

/**
 * @param {array} arrayMarkupStr // array of whole page markup, type should be is string
 * @param {string} pathSelector // css selector where is stored link to next page
 * @returns {array} // return array of links
 */
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
