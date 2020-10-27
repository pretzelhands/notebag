const keyCode = require("./keycode");

const makeAccelerator = (keys) => keys.map(key => keyCode(key)).join("+");

module.exports = {
	makeAccelerator
};
