import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import puppeteer from 'puppeteer';
import ObjectsToCsv from 'objects-to-csv';

async function convertToCSV(data) {
	try {
		const csvFile = new ObjectsToCsv(data);
		await csvFile.toDisk('./test.csv');

		return;
	} catch (error) {
		console.log(error);
	}
}

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
async function test2(arrayOfLinks, callbackFn, objSearchConfig) {
	const LAUNCH_PUPPETEER_OPTS = {
		args: [
			'--no-sandbox',
			'--disable-stuid-sandbox',
			'--disable-dev-shm-usage',
			'--disable-accelerated-2d-canvas',
			'--disable-gpu',
			'--window-size=400x400',
		],
		headless: false,
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

// async function test(arr, callbackFn, objData) {
// 	const pages = await Promise.all(
// 		arr.map(async (url) => await (await fetch(url)).text())
// 	);
// 	const flatten = pages.flat(5);

// 	const exData = await Promise.all(
// 		await flatten.map(async (text) => {
// 			const $ = cheerio.load(text);

// 			const data = {};
// 			for (const property of Object.keys(objData)) {
// 				const name = property;
// 				const elementRef = objData[property];

// 				data[name] = callbackFn(elementRef, $);
// 			}

// 			return data;
// 		})
// 	);

// 	return exData;
// }

/**
 * @param {string} selector // string or object with CSS selector/s. In object must be two props with certain names: 'element' - CSS selector and 'attribute' - DOM element's attribute where needed data is stored
 * @param {*} $ // instance of cheerio package, obligatory to pass
 */
function extractValue(selector, $) {
	if (typeof selector === 'object') {
		const info = [];
		selector.forEach(({ element, attribute }) => {
			$(element).each((i, elm) => info.push($(elm).attr(attribute)));
		});

		return info;
	} else {
		return $(selector).first().text();
	}
}
