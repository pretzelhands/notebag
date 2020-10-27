function difference(otherArray) {
	return function(current){
		return otherArray.filter(function(other) {
			return other.originNote === current.originNote && other.targetNote === current.targetNote;
		}).length !== 0;
	};
}

export {
	difference,
};
