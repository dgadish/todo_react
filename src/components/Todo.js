import React, { useEffect, useRef, useState } from "react";
import usePrevious from "./UsePrevious";

export default function Todo(props) {

  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState(''); 
  const editFieldRef = useRef(null); // used to change focus to the edit field
  const editButtonRef = useRef(null); // used to change focus to the edit button
  const wasEditing = usePrevious(isEditing); // store's previous state of isEditing

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (newName !== "") {
        props.editTask(props.id, newName);
        setNewName("");
        setEditing(false);
    }
    else {
        alert("Please add a new name before updating");
    }
  }

  // template for when editing a task
  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input 
          id={props.id} 
          className="todo-text" 
          type="text"
          value={newName}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">
        <button 
          type="button" 
          className="btn todo-cancel"
          onClick={() => setEditing(false)} //switch to view template when clicked
        >
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );

  // template for when viewing a task
  const viewTemplate = (
    <div className="stack-small">
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
          <button 
            type="button" 
            className="btn"
            onClick={() => setEditing(true)} // switch to edit template when clicked
            ref={editButtonRef}
          >
            Edit <span className="visually-hidden">{props.name}</span>
          </button>
          <button
            type="button"
            className="btn btn__danger"
            onClick={() => props.deleteTask(props.id)} // on click, trigger delete task function with id parameter
          >
            Delete <span className="visually-hidden">{props.name}</span>
          </button>
        </div>
    </div>
  );

  // If isEditing = 'true', change focus to edit field
  // If isEditing = 'false' change focus to edit button 
  // Only runs when value of isEditing changes
  useEffect(() => {
      if (!wasEditing && isEditing) {
          editFieldRef.current.focus();
      }
      else if (wasEditing && !isEditing) {
        editButtonRef.current.focus();
      }
    }, [wasEditing, isEditing]);

  // return a list item view using a ternary operator to switch between view and and editing
  return (
      <li className="todo">
        {isEditing ? editingTemplate : viewTemplate}
      </li>
  );
}