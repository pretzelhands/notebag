import objectScan from "object-scan";

const getAllBacklinks = async (input) => objectScan(["**.type"], {
	rtn: 'parent',
	filterFn: ({ value }) => value === "zettelkasten_link"
})(input);

export default getAllBacklinks;
