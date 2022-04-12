import cors from 'cors';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import getUrls from 'get-urls';

const response = await fetch('https://www.zieglers.com/');
const body = await response.text();
const $ = cheerio.load(body);

const r = [];
$('[data-collapsible]').each((i, elm) => r.push($(elm).attr('href')));

const res1 = await Promise.all(
	r.map(async (link) => await (await fetch(link)).text())
);
const parsedResp = res1.map((tex) => {
	const $ = cheerio.load(tex);
	const r2 = [];
	$('figure > a').each((i, elm) => r2.push($(elm).attr('href')));

	return r2;
});
console.log(parsedResp);
