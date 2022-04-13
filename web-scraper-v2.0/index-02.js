//================= functions =======================//
import { goToPage } from '../functions/go-to-page.js';
import { getLinks } from '../functions/get-links.js';
import { getDataCheerio } from '../functions/get-data-cheerio.js';
import { extractValue } from '../functions/extract-value.js';
import { convertToCSV } from '../functions/convert-to-csv.js';

//================= data for scraping ================//
import { WEB_SITE_URL, selectors, dataToExtract } from '../scraping-params.js';

const a = await goToPage(WEB_SITE_URL);
const b = await getLinks(a, selectors[0]);
const c = await goToPage(b);
const d = await getLinks(c, selectors[1]);
const e = await goToPage(d);
const f = await getLinks(e, selectors[2]);
const g = await getDataCheerio(f.slice(0, 5), extractValue, dataToExtract); // scraping only part of products url because
// a) has restrictions from server due to a lot requests
// b) my notebook turn to rocket when tries to do all that calculations
const h = await convertToCSV(g);
