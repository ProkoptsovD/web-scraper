//================= npm packages ====================//
import puppeteer from 'puppeteer';

/**
 * @param {array} arrayOfLinks // array of urls leading to terminate pages with product cards
 * @param {function} callbackFn // callback functhion for extracting info from certain fileds of the page
 * @param {object} objSearchConfig // accepts object with scraping parameters
 * @returns {array} //return array of objects;
 */
async function getDataPuppeteer(arrayOfLinks, callbackFn, objSearchConfig) {
	const LAUNCH_PUPPETEER_OPTS = {
		args: [
			'--no-sandbox',
			'--disable-stuid-sandbox',
			'--disable-dev-shm-usage',
			'--disable-accelerated-2d-canvas',
			'--disable-gpu',
			'--window-size=400x400',
		],
		headless: true,
	};

	const arrData = [];
	const browser = await puppeteer.launch(LAUNCH_PUPPETEER_OPTS);

	for (const link of arrayOfLinks) {
		const exData = await callbackFn(link, objSearchConfig, browser);
		arrData.push(exData);
	}

	await browser.close();

	return arrData;
}

export { getDataPuppeteer };
