import * as React from 'react';
import { useState, ChangeEvent, FunctionComponent } from 'react';
import TodoItem from './TodoItem';
import '../App.css';

//structure of todo
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  //here are the tasks
  const [tasks, setTasks] = useState<Todo[]>([
  {
  id: 1,
  text: 'Task completed',
  completed: true
  },
  {
  id: 2,
  text: 'Task added',
  completed: false
  }
  ]);
  //the input
  const [text, setText] = useState<string>('');
  //add task function
 const addTask = () => {
  const newTask: Todo = {
  id: Date.now(),
  text,
  completed: false
  };
  setTasks([...tasks, newTask]);
  setText('');
  }
  //delete task function
const deleteTask = (id: number) => {
  setTasks(tasks.filter(task => task.id !== id));
  }
  //checkbox function for complete
 const toggleCompleted = (id: number) => {
  setTasks(tasks.map(task => {
  if (task.id === id) {
  return {...task, completed: !task.completed};
  } else {
  return task;
  } 
  })
  );
  }
 return (
  <div className="todo-list">
    <div className="col-lg-6 col-md-4 col-sm-2 mx-auto mt-4">
      <div className="colored-box text-center">
          {/* Field for rendering tasks */}
              {tasks.map(task => (
              <TodoItem
              key={task.id} 
              task={task}
              deleteTask={() => deleteTask(task.id)}
              toggleCompleted={() => toggleCompleted(task.id)}
              />
              ))}
         {/* Input for adding new tasks */}
        <input
            className="form-control mb-2"
            value={text}
            onChange={(e) => setText(e.target.value)} 
            placeholder="Task"
        />
        {/* Button to add a new task */}
        <button className="btn btn-outline-light" onClick={addTask}>
           Add task
        </button>
      </div>
    </div>
  </div>
  );
 };
 export default TodoList;