//================= functions =======================//
import { goToPage } from '../functions/go-to-page.js';
import { getLinks } from '../functions/get-links.js';
import { getDataPuppeteer } from '../functions/get-data-puppeteer.js';
import { productInfoExtractor } from '../functions/product-info-extractor.js';
import { convertToCSV } from '../functions/convert-to-csv.js';

//================= data for scraping ================//
import { WEB_SITE_URL, selectors, dataToExtract } from '../scraping-params.js';

// const arrHTML1 = await goToPage(WEB_SITE_URL);
// const arrURLs1 = await getLinks(arrHTML1, selectors[0]);
// const arrHTML2 = await goToPage(arrURLs1);
// const arrURLs2 = await getLinks(arrHTML2, selectors[1]);
// const arrHTML3 = await goToPage(arrURLs2);
// const arrURLs3 = await getLinks(arrHTML3, selectors[2]);
const x = await goToPage([
	'https://www.zieglers.com/religious-articles/first-communion/',
]);
const y = await getLinks(x, selectors[2]);
console.log(y);
// const extractedData = await getDataPuppeteer(
// 	arrURLs3.slice(0, 5),
// 	productInfoExtractor,
// 	dataToExtract
// ); // scraping only part of products urls because
// // a) my notebook turns to rocket when tries to do all that calculations
// await convertToCSV(extractedData);
