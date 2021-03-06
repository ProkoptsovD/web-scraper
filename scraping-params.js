const WEB_SITE_NAME = 'www.zieglers.com';
const WEB_SITE_URL = ['https://www.zieglers.com/'];
const selectors = [
	'[data-collapsible="navPages-10"]',
	'ul.navList .navList-action',
	'.card-figure > a',
];

const dataToExtract = {
	title: 'h1.productView-title',
	price: 'span[data-product-price-without-tax]',
	sku: '[data-product-sku]',
	weight: '[data-product-weight]',
	images: [
		{
			element: 'a[data-image-gallery-zoom-image-url]',
			attribute: 'data-image-gallery-zoom-image-url',
		},
	],
};

export { WEB_SITE_NAME, WEB_SITE_URL, selectors, dataToExtract };
