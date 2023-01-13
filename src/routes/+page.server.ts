import puppeteer from 'puppeteer';
import type { Actions } from './$types';

export const actions: Actions = {
	bookmark: async ({ request, fetch }) => {
		const data = await request.formData();
		const url = data.get('url') as string;

		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto(url, {
			waitUntil: 'domcontentloaded'
		});

		const title = await page.title();

		const color = await page.evaluate(() => {
			const metaElements = Array.from(document.querySelectorAll('meta'));
			let color = '';
			metaElements.every((meta) => {
				if (meta.getAttribute('name') === 'theme-color') {
					color = meta.getAttribute('content') ?? '';
					return false;
				}
				return true;
			});

			return color;
		});

		const res = {
			success: true,
			title,
			color: color || '#a0a0a0'
		};

		return res;
	}
};
