//============================= npm packages ================================//
import ObjectsToCsv from 'objects-to-csv';

//============================= data for scraping ===========================//
import { WEB_SITE_NAME } from '../scraping-params.js';

/**
 * @param {array} data // array of object with extracted data needed to convert into csv format file
 */
async function convertToCSV(data) {
	try {
		const csvFile = new ObjectsToCsv(data);
		await csvFile.toDisk(`../scraping-result/${WEB_SITE_NAME}.csv`);

		return;
	} catch (error) {
		console.log(error);
	}
}

export { convertToCSV };
