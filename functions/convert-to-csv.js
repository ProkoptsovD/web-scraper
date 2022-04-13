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

export { convertToCSV };
