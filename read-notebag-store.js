const Conf = require("conf");
const util = require("util");

const store = new Conf({
    name: "notebag",
    cwd: "ABSOLUTE_PATH_TO_FOLDER_CONTAINING_NOTEBAG_JSON",
    encryptionKey: "YOUR_LICENSE_KEY",
});

console.log(
	util.inspect(store.store, false, null)
);
