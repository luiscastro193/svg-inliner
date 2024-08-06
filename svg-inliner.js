"use strict";
async function request(resource, options) {
	let response = await fetch(resource, options);
	if (response.ok) return response; else throw response;
}

function inline(svg) {
	svg.removeAttribute('data-inline');
	request(svg.src).then(response => response.text()).then(html => {svg.outerHTML = html});
}

function inject() {
	document.body.querySelectorAll('img[data-inline]').forEach(inline);
}

const observer = new MutationObserver(inject);
observer.observe(document, {subtree: true, childList: true});
inject();
