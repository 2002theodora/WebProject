import * as React from 'react';
import { useState, ChangeEvent, FunctionComponent } from 'react';
import TodoItem from './TodoItem';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Todo[]>([
  {
  id: 1,
  text: 'Doctor Appointment',
  completed: true
  },
  {
  id: 2,
  text: 'Meeting at School',
  completed: false
  }
  ]);
  
  const [text, setText] = useState<string>('');
 const addTask = () => {
  const newTask: Todo = {
  id: Date.now(),
  text,
  completed: false
  };
  setTasks([...tasks, newTask]);
  setText('');
  }
const deleteTask = (id: number) => {
  setTasks(tasks.filter(task => task.id !== id));
  }
 const toggleCompleted = (id: number) => {
  setTasks(tasks.map(task => {
  if (task.id === id) {
  return {...task, completed: !task.completed};
  } else {
  return task;
  } 
  }));
  }
 return (
  <div className="todo-list">
  {tasks.map(task => (
  <TodoItem
  key={task.id} 
  task={task}
  deleteTask={() => deleteTask(task.id)}
  toggleCompleted={() => toggleCompleted(task.id)}
  />
  ))}
 <input
  value={text}
  onChange={(e) => setText(e.target.value)} 
  />
 <button onClick={addTask}>Add</button>
  </div>
  );
 }
 export default TodoList;