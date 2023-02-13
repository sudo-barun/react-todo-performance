export
function getTodos(count)
{
	return Array(count).fill().map((_, index) => ({
		text: `Item ${index+1}`,
		isCompleted: false,
	}));
}
