export const latexToImage = function (formula) {
	/* eslint-disable-next-line no-undef */
	let wrapper = MathJax.tex2svg(`${formula}`, {em: 16, ex: 16, display: true });
	let mjOut = wrapper.getElementsByTagName("svg")[0];

	return mjOut.outerHTML;
};

window.latexToImage = latexToImage;
