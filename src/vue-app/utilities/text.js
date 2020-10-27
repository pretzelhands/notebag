
function createRange(node, chars, range) {
	if (!range) {
		range = document.createRange();
		range.selectNode(node);
		range.setStart(node, 0);
	}

	if (chars.count === 0) {
		range.setEnd(node, chars.count);
	} else if (node && chars.count >0) {
		if (node.nodeType === Node.TEXT_NODE) {
			if (node.textContent.length < chars.count) {
				chars.count -= node.textContent.length;
			} else {
				range.setEnd(node, chars.count);
				chars.count = 0;
			}
		} else {
			for (var lp = 0; lp < node.childNodes.length; lp++) {
				range = createRange(node.childNodes[lp], chars, range);

				if (chars.count === 0) {
					break;
				}
			}
		}
	}

	return range;
}

function isChildOf(node, parent) {
	while (node !== null) {
		if (node === parent) {
			return true;
		}
		node = node.parentNode;
	}

	return false;
}

export function replaceFromArrays(str, findArray, replaceArray){
	var i, regex = [], map = {};

	if (findArray.length === 0) {
		return str;
	}

	for( i=0; i<findArray.length; i++ ){
		regex.push( findArray[i].replace(/([-[\]{}()*+?.\\^$|#,])/g,"\\$1") );
		map[findArray[i]] = replaceArray[i];
	}

	regex = regex.join("|");
	str = str.replace( new RegExp( regex, "g" ), function(matched){
		return map[matched];
	});

	return str;
}


/*eslint-disable */
function scrollIntoView(t) {
	if (typeof(t) != "object") return;

	if (t.getRangeAt) {
		// we have a Selection object
		if (t.rangeCount == 0) return;
		t = t.getRangeAt(0);
	}

	if (t.cloneRange) {
		// we have a Range object
		var r = t.cloneRange();	// do not modify the source range
		r.collapse(true);		// collapse to start
		var t = r.startContainer;
		// if start is an element, then startOffset is the child number
		// in which the range starts
		if (t.nodeType == 1) t = t.childNodes[r.startOffset];
	}

	// if t is not an element node, then we need to skip back until we find the
	// previous element with which we can call scrollIntoView()
	var o = t;
	while (o && o.nodeType != 1) o = o.previousSibling;
	t = o || t.parentNode;
	if (t) t.scrollIntoView({
		behavior: 'auto',
		block: 'center',
		inline: 'center'
	});
}


/*eslint-enable*/
export const getSelectionHtml = () => {
	var html = "";

	if (typeof window.getSelection != "undefined") {
		var sel = window.getSelection();
		if (sel.rangeCount) {
			var container = document.createElement("div");
			for (var i = 0, len = sel.rangeCount; i < len; ++i) {
				container.appendChild(sel.getRangeAt(i).cloneContents());
			}
			html = container.innerHTML;
		}
	} else if (typeof document.selection != "undefined") {
		if (document.selection.type == "Text") {
			html = document.selection.createRange().htmlText;
		}
	}
	return html;
};

export function setCurrentCursorPosition(chars) {
	if (chars >= 0) {
		var selection = window.getSelection();
		var range = createRange(document.querySelector(".ProseMirror").parentNode, { count: chars });

		if (range) {
			range.collapse(false);
			selection.removeAllRanges();
			selection.addRange(range);
		}

		scrollIntoView(selection);
	}
}

export function getCurrentCursorPosition() {
	var parent = document.querySelector(".ProseMirror").parentNode;
	var selection = window.getSelection(),
		charCount = -1,
		node;

	if (selection.focusNode) {
		if (isChildOf(selection.focusNode, parent)) {
			node = selection.focusNode;
			charCount = selection.focusOffset;

			while (node) {
				if (node === parent) {
					break;
				}

				if (node.previousSibling) {
					node = node.previousSibling;
					charCount += node.textContent.length;
				} else {
					node = node.parentNode;
					if (node === null) {
						break;
					}
				}
			}
		}
	}

	return charCount;
}
