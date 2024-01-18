import * as React from 'react';
import '../App.css';

//structure of todo
interface Todo {
    id: number;
    text: string;
    completed: boolean;
    assignee?: string;
  status: 'OPEN' | 'PENDING' | 'COMPLETED' | 'CLOSED';

  }
//properties that TodoItem component expects
interface TodoItemProps {
    task: Todo;
    deleteTask: (id: number) => void;
    toggleCompleted: (id: number) => void;
  }

  const TodoItem: React.FC<TodoItemProps> = ({ task, deleteTask, toggleCompleted }) => {
    //delete task
    const handleDelete = () => {
      deleteTask(task.id);
    };
    //check/uncheck complete task
    const handleChange = () => {
      toggleCompleted(task.id);
    };
 
 return (
        <div className={`todo-item ${task.completed ? 'completed' : ''}`}>
            {/* Checkbox to indicate completion status */}
            <input 
                  type="checkbox"
                  checked={task.completed}
                  onChange={handleChange}
            />
            {/* Display the text of the task */}
                <p>{task.text}</p>
                <p>{task.assignee}</p>
                <p>Status: {task.status}</p>
            {/* Button to delete the task */}
            <button onClick={handleDelete}>X</button>
            </div>
            );
 }           
export default TodoItem