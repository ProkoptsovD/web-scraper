import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const selectors = {
	pathSelectors: ['[data-collapsible="navPages-10"]', '.navList-action'],
	terminateSelector: '.card-figure > a',
};
const url = ['https://www.zieglers.com/religious-articles/sacramental/'];

const res2 = await getLinks(url);
console.log(res2);

/**
 * @param {array} arrayMarkupStr // array of whole page markup, type should be is string
 * @param {string} pathSelector // css selector where is stored link to next page
 * @returns {array} // return array of links
 */
async function getLinks(URLS) {
	try {
		let i = 0;
		const { pathSelectors, terminateSelector } = selectors;

		const pages = await Promise.all(
			URLS.map(async (url) => await (await fetch(url)).text())
		);
		const links = await Promise.all(
			pages.map((text) => {
				const $ = cheerio.load(text);
				const a = $(pathSelectors[i])
					.toArray()
					.map((elm) => $(elm).attr('href'));

				return a;
			})
		);
		const sanitizedLinks = links.flat(5);
		if (!sanitizedLinks) {
			return console.log('end');
		}
		i++;
		return getLinks(sanitizedLinks);
	} catch (error) {
		console.log(error);
	}
}

/**
 * @param {array} arrayURLs // array of urls/links
 * @returns {array} // one dimentioned array of urls/links;
 */
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
