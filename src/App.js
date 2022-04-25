import React from 'react';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';


function App(props) {

  // callback prop that takes data from a form (user input) and passes it to a component <Form /> as a prop
  function addTask(name) {
    alert(name);
  }

  // create list of tasks based on <Todo /> component and the tasks rendered in index.js
  const taskList = props.tasks.map(task => (
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
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList} {/* call the task list from the tasklist variable */}
      </ul>
    </div>
  );
}

export default App;
