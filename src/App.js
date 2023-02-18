import { useState } from 'react';
import './App.css';
import TodoListMultipleClass from './todo-list/TodoListMultipleClass';
import TodoListMultipleFunction from './todo-list/TodoListMultipleFunction';
import TodoListSingleClass from './todo-list/TodoListSingleClass';
import TodoListSingleFunction from './todo-list/TodoListSingleFunction';

function App() {
  let [ visibleTab, setVisibleTab ] = useState('single_class');

  return (
    <div className="container mt-4 mb-5">
      <div className="row">
        <div className="col-xxl-10 mx-auto">
          <h1 className="h2 float-start">To-do List </h1>
          <ul className="nav nav-pills float-start ms-3">
            <li className="nav-item">
              <a href="#"
                className={`nav-link ${visibleTab === 'single_class' ? 'active' : ''}`}
                onClick={(ev) => {
                  ev.preventDefault();
                  setVisibleTab('single_class');
                }}
              >
                Single class
              </a>
            </li>
            <li className="nav-item">
              <a href="#"
                className={`nav-link ${visibleTab === 'multiple_class' ? 'active' : ''}`}
                onClick={(ev) => {
                  ev.preventDefault();
                  setVisibleTab('multiple_class');
                }}
              >
                Multiple class
              </a>
            </li>
            <li className="nav-item">
              <a href="#"
                className={`nav-link ${visibleTab === 'single_function' ? 'active' : ''}`}
                onClick={(ev) => {
                  ev.preventDefault();
                  setVisibleTab('single_function');
                }}
              >
                Single function
              </a>
            </li>
            <li className="nav-item">
              <a href="#"
                className={`nav-link ${visibleTab === 'multiple_function' ? 'active' : ''}`}
                onClick={(ev) => {
                  ev.preventDefault();
                  setVisibleTab('multiple_function');
                }}
              >
                Multiple function
              </a>
            </li>
          </ul>
          <div className="clearfix"></div>
          <div className="tab-content">
            {
              visibleTab === 'single_class' ? (
                <div className='tab-pane active'>
                  <TodoListSingleClass />
                </div>
              ) : ''
            }
            {
              visibleTab === 'multiple_class' ? (
                <div className='tab-pane active'>
                  <TodoListMultipleClass />
                </div>
              ) : ''
            }
            {
              visibleTab === 'single_function' ? (
                <div className='tab-pane active'>
                  <TodoListSingleFunction />
                </div>
              ) : ''
            }
            {
              visibleTab === 'multiple_function' ? (
                <div className='tab-pane active'>
                  <TodoListMultipleFunction />
                </div>
              ) : ''
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
