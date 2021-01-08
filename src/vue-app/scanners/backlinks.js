import objectScan from "object-scan";

const getAllBacklinks = async (input) => {
	let results = [];

	objectScan(["**.type"], {
		filterFn: ({ value, parent }) => {
			const isLinkNode = value === "zettelkasten_link";

			if (isLinkNode) {
				results.push(parent);
			}
		}
	})(input);

	return results;
};

export default getAllBacklinks;
