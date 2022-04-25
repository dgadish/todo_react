import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// list of details for each task
const DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false }
];

// render the above data in <App />
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App subject="Rachel" tasks={DATA} />
  </React.StrictMode>
);
