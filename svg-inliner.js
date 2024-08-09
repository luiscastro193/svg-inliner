"use strict";
async function request(resource, options) {
	let response = await fetch(resource, options);
	if (response.ok) return response; else throw response;
}

export default async function inline(svg) {
	svg.removeAttribute('data-inline');
	svg.outerHTML = await (await request(svg.src)).text();
}

let pending = false;

function inject() {
	pending = false;
	document.body.querySelectorAll('img[data-inline]').forEach(inline);
}

function requestInject() {
	if (!pending) {
		pending = true;
		setTimeout(inject, 0);
	}
}

new MutationObserver(requestInject).observe(document, {subtree: true, childList: true});
requestInject();
