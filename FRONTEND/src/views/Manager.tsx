import TodoItem from "../components/TodoItem";
import TodoList from "../components/TodoList";

export default function ManagerList(){
    return(
        <div>
        <h1>Manager page</h1>
 
        <div className="Todolist">
         <TodoList />
        </div>
        
     </div>
    )    
}