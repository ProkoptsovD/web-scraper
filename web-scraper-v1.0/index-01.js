//================= npm packages ====================//
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import puppeteer from 'puppeteer';
import ObjectsToCsv from 'objects-to-csv';

//================= functions =======================//
import { goToPage } from '../functions/go-to-page.js';
import { getLinks } from '../functions/get-links.js';
import { getData } from '../functions/get-data.js';
import { productInfoExtractor } from '../functions/product-info-extractor.js';
import { convertToCSV } from '../functions/convert-to-csv.js';

//================= data for scraping ================//
import { WEB_SITE_URL, selectors, dataToExtract } from '../scraping-params.js';

const a = await goToPage(WEB_SITE_URL);
const b = await getLinks(a, selectors[0]);
const c = await goToPage(b);
const d = await getLinks(c, selectors[1]);
const e = await goToPage(d);
const f = await getLinks(e, selectors[2]);
const g = await getData(f.slice(0, 10), productInfoExtractor, dataToExtract);
const h = await convertToCSV(g);
