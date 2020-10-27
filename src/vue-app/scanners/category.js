import objectScan from "object-scan";

const getAllCategories = async (input) => {
	let results = [];

	objectScan(["**.type"], {
		filterFn: (type) => {
			const isCategoryNode = type.value === "category";

			if (isCategoryNode) {
				results.push(type.parents[0]);
			}
		}
	})(input);

	return results;
};

export default getAllCategories;
