export const makeProject = (newProject) => {
	const tag = newProject.tag;
	const title = newProject.title || newProject.tag;
	const notes = newProject.notes || [];
	const pinned = newProject.pinned || false;

	return {
		tag,
		title,
		notes,
		pinned,
	};
};
