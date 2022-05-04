import React, { useState } from 'react';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import { nanoid } from 'nanoid'; 

// filter functions defined outside of app as these will not change, don't want to recalculate every time the app loads
// create function mapping for the filters
const FILTER_MAP = {
  ALL: () => true,
  ACTIVE: task => !task.completed,
  COMPLETED: task => task.completed
};

// collect an array of filter names
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {

  const [tasks, setTasks] = useState(props.tasks); //preserves initial state of props.tasks from index.js
  const [filter, setFilter] = useState('All'); // set default state for tasks filter
  
  // create list of tasks based on <Todo /> component and the tasks rendered in index.js
  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map(task => (
    <Todo 
      id={task.id} 
      name={task.name} 
      completed={task.completed}
      key={task.id} 
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task'; // if taskList.length is 1, use 'task', otherwise use 'tasks'
  const headingText = `${taskList.length} ${tasksNoun} remaining`; // variable for dynamic list length count

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton 
      key={name} 
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  // add task to the task list
  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false }; // creates the new task
    setTasks([...tasks, newTask]); // adds new task to tasks array ('...tasks' copies existing array 'tasks')
  }
  
  // toggle completed state
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same id as the eddited task
      if (id === task.id) {
        // use object spread to make a new object whose 'completed' prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks)
  }

  // edit name of existing task
  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
    // if this task has the same ID as the edited task
      if (id === task.id) {
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  // delete task whose delete button was clicked by filtering tasks array for tasks whose id doesn't match
  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} /> {/* Create input form, utilising the 'addTask' function to allow the user input to be passed as a prop to <Form /> */}
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">
        {headingText}
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
