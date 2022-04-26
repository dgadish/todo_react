import React, { useState } from 'react';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import { nanoid } from 'nanoid'; 


function App(props) {

  const [tasks, setTasks] = useState(props.tasks); //preserves initial state of props.tasks from index.js

  // callback function triggered when someone submits an entry in the add task form
  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false }; // creates the new task
    setTasks([...tasks, newTask]); // adds new task to tasks array ('...tasks' copies existing array 'tasks')
  }

  // create list of tasks based on <Todo /> component and the tasks rendered in index.js
  const taskList = tasks.map(task => (
    <Todo 
      id={task.id} 
      name={task.name} 
      completed={task.completed}
      key={task.id} 
    />
  ));

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} /> {/* Create input form, utilising the 'addTask' function to allow the user input to be passed as a prop to <Form /> */}
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">
        3 tasks remaining
      </h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList} {/* renders the list created in the tasklist variable */}
      </ul>
    </div>
  );
}

export default App;
