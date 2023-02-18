import React from "react";
import { getTodos, truncateTodos } from "./common.js";

export default
class TodoListSingleClass extends React.Component
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
									onInput={(ev)=>this.setState({
										newTodo: ev.target.value,
									})} />
								<button
									className="btn btn-outline-secondary"
									disabled={state.newTodo.trim() === ''}
									onClick={()=>{
										this.setState({
											todos: [
												{
													text: state.newTodo.trim(),
													isCompleted: false,
												},
												...todos,
											],
											newTodo: '',
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
							todos.map((todo, index) => (
								<React.Fragment key={index}>
									<div className="list-group-item">
										<input
											type="checkbox"
											id={`todo-item-${index}`}
											className="form-check-input"
											checked={todo.isCompleted}
											onChange={(ev)=>{
												todo.isCompleted = ev.target.checked;
												this.setState({
													todos: [...todos],
												});
											}}
										/>
										<span> </span>
										<label
											className={`form-check-label ${todo.isCompleted ? `text-decoration-line-through` : ''}` }
											htmlFor={`todo-item-${index}`}
										>
											{todo.text}
										</label>
										<button
											className="btn btn-sm btn-outline-danger float-end"
											onClick={()=>{
												todos.splice(index, 1);
												this.setState({
													todos: [...todos],
												});
											}}
										>
											Remove
										</button>
									</div>
								</React.Fragment>
							))
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
								...this.state,
								...{ todos: truncateTodos(todos, 20) }
							}, null, 2)}
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
