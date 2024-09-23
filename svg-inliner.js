"use strict";
async function request(resource, options) {
	let response = await fetch(resource, options);
	if (response.ok) return response; else throw response;
}

function debounce(callback) {
	let pending = false;
	return (...args) => {
		if (!pending) {
			pending = true;
			setTimeout(() => {
				pending = false;
				callback(...args);
			}, 0);
		}
	}
}

export default async function inline(svg) {
	svg.removeAttribute('data-inline');
	svg.outerHTML = await (await request(svg.src)).text();
}

const inject = debounce(() => document.body.querySelectorAll('img[data-inline]').forEach(inline));
new MutationObserver(inject).observe(document, {subtree: true, childList: true});
inject();