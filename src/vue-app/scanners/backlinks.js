import objectScan from "object-scan";

const getAllBacklinks = async (input) => {
	let results = [];

	objectScan(["**.type"], {
		filterFn: (type) => {
			const isLinkNode = type.value === "zettelkasten_link";

			if (isLinkNode) {
				results.push(type.parents[0]);
			}
		}
	})(input);

	return results;
};

export default getAllBacklinks;
