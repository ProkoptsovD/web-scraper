//================= npm packages ======================//
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

/**
 * @param {array} arrayURLs // array of urls leading to terminate pages with product cards
 * @param {function} callbackFn // callback functhion for extracting info from certain fileds of the page
 * @param {object} objData // accepts object with scraping parameters
 * @returns {array} //return array of objects;
 */
async function getDataCheerio(arrayURLs, callbackFn, objData) {
	const pages = await Promise.all(
		arrayURLs.map(async (url) => await (await fetch(url)).text())
	);
	const flatten = pages.flat(5);

	const exData = await Promise.all(
		flatten.map(async (text) => {
			const $ = cheerio.load(text);

			const data = {};
			for (const property of Object.keys(objData)) {
				const name = property;
				const elementRef = objData[property];

				data[name] = callbackFn(elementRef, $);
			}

			return data;
		})
	);

	return exData;
}

export { getDataCheerio };
