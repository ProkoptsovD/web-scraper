//================= npm packages ====================//
import * as cheerio from 'cheerio';

//================= functions
import { extractValue } from './extract-value.js';

/**
 * @param {string} url // one link, type should be a string
 * @param {object} extractData // object with data (name of fields and css celectors) that must be extracted
 * @param {instatnce} puppeteerBrowser // is obligatory to pass created before puppeteer instance from Puppeteer npm package
 * @returns {array} // array of objects containing extracted data
 */
async function productInfoExtractor(url, extractData, puppeteerBrowser) {
	try {
		const page = await puppeteerBrowser.newPage({ timeout: 0 });
		await page.goto(url, {
			timeout: 0,
		});

		const targetPageContent = await page.content();
		await page.close();

		const $ = cheerio.load(targetPageContent);
		const data = {};

		for (const prop of Object.keys(extractData)) {
			data[prop] = extractValue(extractData[prop], $);
		}

		return data;
	} catch (error) {
		console.log(error);
	}
}

export { productInfoExtractor };
