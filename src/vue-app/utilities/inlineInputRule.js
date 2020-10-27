import { InputRule } from "prosemirror-inputrules";

export default function inlineInputRule(regexp, type, getAttrs) {
	return new InputRule(regexp, function (state, match, start, end) {
		var attrs = getAttrs instanceof Function ? getAttrs(match) : getAttrs;
		var tr = state.tr;


		if (match[1]) {
			tr.replaceWith(start, end, type.create(attrs));

			if (type.name === "category") {
				tr.insertText(attrs.endingCharacter);
			}
		}

		return tr;
	});
}
