import objectScan from "object-scan";

const getAllCategories = async (input) => {
	let results = [];

	objectScan(["**.type"], {
		filterFn: ({ value, parent }) => {
			const isCategoryNode = value === "category";

			if (isCategoryNode) {
				results.push(parent);
			}
		}
	})(input);

	return results;
};

export default getAllCategories;
