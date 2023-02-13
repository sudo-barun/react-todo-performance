import React from "react";
import { getTodos } from "./common.js";

class NewTodo extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			newTodo: '',
		};
	}

	render()
	{
		let inputElement;
		return (
			<form
				className="input-group mb-3 w-75 mx-auto"
				onSubmit={(ev)=>ev.preventDefault()}
			>
				<input
					className="form-control"
					ref={(el) => inputElement = el}
					onInput={(ev)=>this.setState({
						newTodo: ev.target.value,
					})}
				/>
				<button
					className="btn btn-outline-secondary"
					disabled={this.state.newTodo.trim() === ''}
					onClick={()=>{
						this.props.onAddNewTodo(this.state.newTodo.trim());
						this.setState({
							newTodo: '',
						});
						inputElement.value = '';
					}}
				>
					Add
				</button>
			</form>
		);
	}
}

export default
class TodoListMultipleClass extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			todos: getTodos(10),
		};
	}

	render()
	{
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
								<NewTodo onAddNewTodo={(newTodo) => {
									this.setState({
										todos: [
											{
												text: newTodo,
												isCompleted: false,
											},
											...this.state.todos,
										],
									});
								}}/>
						</div>
						<div className="col-md-auto">
							<button
								className="btn btn-outline-danger float-end"
								disabled={!this.state.todos.some((todo)=>todo.isCompleted)}
								onClick={() => {
									this.setState({
										todos: this.state.todos.filter((todo) => !todo.isCompleted)
									})
								}}
							>
								Remove completed
							</button>
						</div>
					</div>
					<div><b>Total: </b>{this.state.todos.length}</div>
					{(! this.state.todos.length) ? (
						<div className="text-secondary text-center">
							The todo list is empty.
						</div>
					) : ''}
					<div className="list-group mb-5">
						{
							this.state.todos.map((todo, index) => (
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
													todos: [...this.state.todos],
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
												this.state.todos.splice(index, 1);
												this.setState({
													todos: [...this.state.todos],
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
							{JSON.stringify(this.state, null, 2)}
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
