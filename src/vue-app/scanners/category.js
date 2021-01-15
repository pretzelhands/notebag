import objectScan from "object-scan";

const getAllCategories = async (input) => objectScan(["**.type"], {
	rtn: 'parent',
	filterFn: ({ value }) => value === "category"
})(input);

export default getAllCategories;
