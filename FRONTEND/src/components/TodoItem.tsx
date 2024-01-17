import * as React from 'react';
import '../App.css';

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
    const handleDelete = () => {
      deleteTask(task.id);
    };
  
    const handleChange = () => {
      toggleCompleted(task.id);
    };
 
 return (
        <div className={`todo-item ${task.completed ? 'completed' : ''}`}>
            <input 
                  type="checkbox"
                  checked={task.completed}
                  onChange={handleChange}
            />
                <p>{task.text}</p>
            <button onClick={handleDelete}>X</button>
            </div>
            );
 }           
export default TodoItem