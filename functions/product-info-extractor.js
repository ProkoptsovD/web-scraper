import { extractValue } from './extract-value.js';

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
