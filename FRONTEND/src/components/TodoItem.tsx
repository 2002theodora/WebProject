import * as React from 'react';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }
  interface TodoItemProps {
    task: Todo;
    deleteTask: (id: number) => void;
    toggleCompleted: (id: number) => void;
  }

  const TodoItem: React.FC<TodoItemProps> = ({ task, deleteTask, toggleCompleted }) => {
    const handleChange = () => {
 toggleCompleted(task.id);
 }
 
 return (
 <div className="todo-item">
 <input 
 type="checkbox"
 checked={task.completed}
 onChange={handleChange}
 />
<p>{task.text}</p>
<button onClick={() => deleteTask(task.id)}>
 X
 </button>
 </div>
 );
}
export default TodoItem;