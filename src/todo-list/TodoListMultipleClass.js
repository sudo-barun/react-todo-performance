import React from "react";
import { getTodos, truncateTodos } from "./common.js";

class Todo extends React.Component
{
	constructor(props)
	{
		super(props);
		this.initialTodo = props.todo;
		this.state = {
			...props.todo,
		};
	}

	componentDidUpdate()
	{
		if (this.initialTodo !== this.props.todo) {
			this.initialTodo = this.props.todo;
			this.setState(this.state);
		}
	}

	render()
	{
		if (this.initialTodo !== this.props.todo) {
			this.state = {
				...this.props.todo,
			};
		}

		const { text, isCompleted } = this.state;
		const index = this.props.index;

		return (
			<div className="list-group-item">
				<input
					type="checkbox"
					id={`todo-item-${index}`}
					className="form-check-input"
					checked={isCompleted}
					onChange={(ev) => {
						const isCompleted = ev.target.checked;
						this.setState({
							isCompleted: isCompleted,
						});
						this.props.onTodoUpdate({
							...this.state,
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
					onClick={() => this.props.onTodoRemove()}
				>
					Remove
				</button>
			</div>
		);
	}
}

class TodoList extends React.Component
{
	shouldComponentUpdate(nextProps)
	{
		return nextProps.todos !== this.props.todos;
	}

	render()
	{
		return this.props.todos.map((todo, index) => (
			<Todo key={index}
				todo={todo}
				index={index}
				onTodoUpdate={(todo) => {
					this.props.onTodoUpdate(index, todo);
				}}
				onTodoRemove={() => {
					this.props.onTodoRemove(index);
				}}
			/>
		));
	}
}

export default
class TodoListMultipleClass extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			newTodo: '',
			todos: getTodos(10),
		};
	}

	render()
	{
		const state = this.state;
		const todos = this.state.todos;

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
										onClick={() => this.setState({
											todos: getTodos(count),
										})}
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
									value={state.newTodo}
									onInput={(ev) => {
										this.setState({
											newTodo: ev.target.value,
										});
									}}
								/>
								<button
									className="btn btn-outline-secondary"
									disabled={state.newTodo.trim() === ''}
									onClick={()=>{
										this.setState({
											newTodo: '',
											todos: [{
												text: state.newTodo.trim(),
												isCompleted: false,
											}].concat(todos),
										});
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
									this.setState({
										todos: todos.filter((todo) => !todo.isCompleted)
									})
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
						{
							<TodoList
								todos={todos}
								onTodoUpdate={(index, todo) => {
									todos[index] = todo;
									this.setState({
										todos,
									});
								}}
								onTodoRemove={(index) => {
									todos.splice(index, 1);
									this.setState({
										todos: [...todos],
									});
								}}
							/>
						}
					</div>
				</div>
				<div className="col-lg-4">
					<h5>Data</h5>
					<pre
						ref={(el)=>{this.preElement = el}}
					>
						<code>
							{JSON.stringify({
								...state,
								...{ todos: truncateTodos(todos, 20) }
							} , null, 2)}
						</code>
					</pre>
				</div>
			</div>
		);
	}

	preElement;

	componentDidMount()
	{
		this.preElement.setAttribute('style', "border: 1px solid #ccc; padding: 20px");
	}

	componentDidUpdate()
	{
		this.preElement.setAttribute('style', "border: 1px solid #ccc; padding: 20px");
	}
}
