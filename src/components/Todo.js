import React from "react";

export default function Todo(props) {

    // return a list item for a task including a checkbox, an edit button and a delete button
    return (
        <li className="todo stack-small">
          <div className="c-cb">
            <input 
              id={props.id} 
              type="checkbox" 
              defaultChecked={props.completed}
              onChange={() => props.toggleTaskCompleted(props.id)} // anonymous function to call props.toggleTaskCompleted 
            />
            <label className="todo-label" htmlFor={props.id}>
              {props.name}
            </label>
          </div>
          <div className="btn-group">
            <button type="button" className="btn">
              Edit <span className="visually-hidden">{props.name}</span>
            </button>
            <button type="button" className="btn btn__danger" onClick={() => props.deleteTask(props.id)}> {/* on click, trigger delete task function with id parameter */}
              Delete <span className="visually-hidden">{props.name}</span>
            </button>
          </div>
        </li>
    );
}