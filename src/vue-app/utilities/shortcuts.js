import keyCode from "@/utilities/keycode";
import Mousetrap from "mousetrap";

const makeAccelerator = (keys, mousetrap = false) => {
	const connector = mousetrap ? "+" : "-";

	return keys.map(key => keyCode(key, mousetrap)).join(connector);
};

const redefineMousetrapShortcut = function (bindingObject) {
	return (shortcut, oldKeys, newKeys) => {
		const oldAccelerator = makeAccelerator(oldKeys, true);
		const accelerator = makeAccelerator(newKeys, true);

		Mousetrap.unbind(oldAccelerator);
		Mousetrap.bind(accelerator, bindingObject[shortcut]);
	};
};

export {
	makeAccelerator,
	redefineMousetrapShortcut,
};
