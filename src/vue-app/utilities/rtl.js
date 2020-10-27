export function handleRtlParagraphs() {
	/**
	 * [\u05D0-\u05EA] - Hebrew
     * [\u0620-\u063F]|[\u0641-\u064A]|[\u0675-\u06D3] - Arabic
     * [\u0710-\u071C]|[\u071E-\u072F] - Syrian
     * [\u074E-\u077F] - Arabic Supplement
     * [\u08A0-\u08AC]|[\u08AE-\u08B4] - Arabic Extended
     * [\u07C1-\u07C9]|[\u07CC-\u07E9] - Thâna
	 */

	const patt = /[\u05D0-\u05EA]|[\u0620-\u063F]|[\u0641-\u064A]|[\u0675-\u06D3]|[\u0710-\u071C]|[\u071E-\u072F]|[\u074E-\u077F]|[\u08A0-\u08AC]|[\u08AE-\u08B4]|[\u07C1-\u07C9]|[\u07CC-\u07E9]/g;
	let rtlStates = [];

	document
		.querySelectorAll(".ProseMirror")
		.forEach(el =>
		{
			if (!patt.test(el.textContent)) {
				document.querySelector(".ProseMirror").style = "";
				rtlStates.push(false);
				return;
			}

			document.querySelector(".ProseMirror").style.direction = "rtl";
			document.querySelector(".ProseMirror").style.textAlign = "right";
			document.querySelector(".ProseMirror").style.fontFamily = "sans-serif";

			rtlStates.push(true);
		});

	document
		.querySelectorAll(".editor__title")
		.forEach(el =>
		{
			if (!patt.test(el.value)) {
				document.querySelector(".editor__title").style = "";
				rtlStates.push(false);
				return;
			}

			document.querySelector(".editor__title").style.direction = "rtl";
			document.querySelector(".editor__title").style.textAlign = "right";
			document.querySelector(".editor__title").style.fontFamily = "sans-serif";

			rtlStates.push(true);
		});

	return rtlStates.some(state => state);
}

window.handleRtlParagraphs = handleRtlParagraphs();
