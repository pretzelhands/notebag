import { InputRule } from "prosemirror-inputrules";

import store from "@/store/store";
import Actions from "@/store/actions";

export default function zettelInputRule(regexp, type, getAttrs) {
	return new InputRule(regexp, function (state, match, start, end) {
		const attrs = getAttrs instanceof Function ? getAttrs(match) : getAttrs;
		const { tr } = state;

		if (match[1]) {
			tr.replaceWith(start, end, type.create(attrs));
			store.dispatch({
				type: Actions.ADD_ZETTELKASTEN_BACKLINK,
				linkTo: match[1],
				linkFrom: store.state.activeNote,
				identifier: attrs.uniqueIdentifier,
			});
		}

		return tr;
	});
}
