export
function getTodos(count)
{
	return Array(count).fill().map((_, index) => ({
		text: `Item ${index+1}`,
		isCompleted: false,
	}));
}

export
function truncateTodos(todos, total)
{
	if (todos.length > total) {
		const removeCount = todos.length - total;
		todos = todos.slice(0, total);
		todos.push(`${removeCount} items has been excluded.`);
		return todos;
	}
	return todos;
}
