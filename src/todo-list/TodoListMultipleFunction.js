import React, { memo, useCallback, useEffect, useRef } from "react";
import { useState } from 'react';
import { getTodos, truncateTodos } from "./common";

function Todo({ todo, index, onTodoUpdate, onTodoRemove})
{
	const [initialTodo, setInitialTodo ] = useState(todo);
	const { text } = todo;
	const [ isCompleted, setIsCompleted ] = useState(todo.isCompleted);
	const mounted = useRef();

	useEffect(() => {
		if (! mounted.current) {
			// do componentDidMount logic
			mounted.current = true;
		} else {
			// do componentDidUpdate logic
			if (initialTodo !== todo) {
				setInitialTodo(todo);
				setIsCompleted(todo.isCompleted);
			}
		}
	});

	return (
		<div className="list-group-item">
			<input
				type="checkbox"
				id={`todo-item-${index}`}
				className="form-check-input"
				checked={isCompleted}
				onChange={(ev) => {
					const isCompleted = ev.target.checked;
					setIsCompleted(isCompleted);
					onTodoUpdate({
						...todo,
						isCompleted: isCompleted,
					});
				}}
			/>
			<span> </span>
			<label
				className={`form-check-label ${isCompleted ? `text-decoration-line-through` : ''}` }
				htmlFor={`todo-item-${index}`}
			>
				{text}
			</label>
			<button
				className="btn btn-sm btn-outline-danger float-end"
				onClick={() => onTodoRemove()}
			>
				Remove
			</button>
		</div>
	);
}

const TodoList = memo(function ({ todos, onTodoUpdate, onTodoRemove })
{
	return todos.map((todo, index) => (
		<Todo key={index}
			index={index}
			todo={todo}
			onTodoUpdate={(todo) => {
				onTodoUpdate(index, todo);
			}}
			onTodoRemove={() => {
				onTodoRemove(index);
			}}
		/>
	));
}, (oldProps, newProps)=> {
	return newProps.todos === oldProps.todos;
});

export default
function TodoListMultipleFunction()
{
	const [ newTodo, setNewTodo ] = useState('');
	const [ todos, setTodos ] = useState(getTodos(10));

	let preElement;

	useEffect(() => {
		preElement.setAttribute('style', "border: 1px solid #ccc; padding: 20px");
	}, []);

	const [, setFakeState] = useState({});
	const forceUpdate = useCallback(() => setFakeState({}), []);

	return (
		<div className="row mt-4">
			<div className="col-lg-8">
				<div className="mb-4">
					<span>Reset to-do list with </span>
					{
						[0,5,10,50,100,500,1000,5000,10000].map((count, index) => (
							<React.Fragment key={index}>
								<button
									className="btn btn-sm btn-outline-secondary"
									onClick={() => setTodos(getTodos(count))}
								>
									{count}
								</button>
								<span> </span>
							</React.Fragment>
						))
					}
					items
				</div>
				<div className="row">
					<div className="col-md">
						<form
							className="input-group mb-3 w-75 mx-auto"
							onSubmit={(ev)=>ev.preventDefault()}
						>
							<input
								className="form-control"
								value={newTodo}
								onInput={(ev) => setNewTodo(ev.target.value)}
							/>
							<button
								className="btn btn-outline-secondary"
								disabled={newTodo.trim() === ''}
								onClick={()=>{
									setTodos([
										{
											text: newTodo.trim(),
											isCompleted: false,
										},
										...todos,
									]);
									setNewTodo('');
								}}
							>
								Add
							</button>
						</form>
					</div>
					<div className="col-md-auto">
						<button
							className="btn btn-outline-danger float-end"
							disabled={!todos.some((todo)=>todo.isCompleted)}
							onClick={() => {
								setTodos(todos.filter((todo) => !todo.isCompleted));
							}}
						>
							Remove completed
						</button>
					</div>
				</div>
				<div><b>Total: </b>{todos.length}</div>
				{(! todos.length) ? (
					<div className="text-secondary text-center">
						The todo list is empty.
					</div>
				) : ''}
				<div className="list-group mb-5">
					<TodoList
						todos={todos}
						onTodoUpdate={(index, todo) => {
							todos[index] = todo;
							forceUpdate();
						}}
						onTodoRemove={(index) => {
							todos.splice(index, 1);
							setTodos([...todos]);
						}}
					/>
				</div>
			</div>
			<div className="col-lg-4">
				<h5>Data</h5>
				<pre
					ref={(el)=>{preElement = el}}
				>
					<code>
						{JSON.stringify({
							newTodo,
							...{ todos: truncateTodos(todos, 20) }
						}, null, 2)}
					</code>
				</pre>
			</div>
		</div>
	);
}
