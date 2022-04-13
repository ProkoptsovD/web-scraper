/**
 * @param {string} selector // string or object with CSS selector/s. In object must be two props with certain names: 'element' - CSS selector and 'attribute' - DOM element's attribute where needed data is stored
 * @param {instance} $ // created instance from cheerio npm package, obligatory to pass
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

export { extractValue };
