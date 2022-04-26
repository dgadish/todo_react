import React, {useState} from "react";

export default function Form(props) {

    const [name, setName] = useState(''); // sets state that can be tracked within component

    // function for collecting form input
    function handleChange(e) {
        // console.log(e.target.value) --> sends input from form to console
        setName(e.target.value) //sets form input as what user types
    }

    // function triggered by submitting form
    function handleSubmit(e) {
        e.preventDefault();
        if (name != "") {
          props.addTask(name);
          setName("");
        }
        else {
          alert("Please enter a task before submitting");
        }
    }

    // return a form for submitting tasks
    return (
        <form onSubmit={handleSubmit}> {/* calls the 'handleSubmit' function when form submitted */}
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
          placeholder="add new task" //add hint/ placeholder
          value={name} // value in form is equal to user input
          onChange={handleChange} // when there is a change in the input the 'handleChange' function is called
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>
    );
}
