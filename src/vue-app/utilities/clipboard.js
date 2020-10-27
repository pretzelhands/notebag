import {getSelectionHtml} from "@/utilities/text";
import toMarkdown from "@/converters/to-markdown";

const convertToPng = (imageElement) => {
	return new Promise((resolve) => {
		const safeImage = document.createElement("img");
		safeImage.crossOrigin = "anonymous";
		safeImage.onload = function(evt) {
			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext("2d");

			canvas.width = evt.target.width;
			canvas.height = evt.target.height;
			ctx.drawImage(evt.target, 0, 0, evt.target.width, evt.target.height);
			canvas.toBlob(resolve, "image/png", 1);
		};

		safeImage.src = imageElement.getAttribute("src");
	});
};

export const convertClipboardToMarkdown = (event) => {
	const html = getSelectionHtml();

	/* eslint-disable no-undef */
	if (event.target.nodeName === "IMG") {
		convertToPng(event.target)
			.then(blob => {
				const item = new ClipboardItem({
					[blob.type]: blob
				});

				navigator.clipboard.write([ item ])
					.catch(err => console.error(err));
			})
			.catch(err => console.error(err));

		event.preventDefault();
		return;
	}

	event.clipboardData.setData("text/plain", toMarkdown(html));
	event.preventDefault();
};
