async function getData(arrayOfLinks, callbackFn, objSearchConfig) {
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

export { getData };
