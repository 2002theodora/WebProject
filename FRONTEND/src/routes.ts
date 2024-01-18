
import Employee from "./views/Employee";
import Manager from "./views/Manager";
import EmployeeEdit from "./views/EmployeeEdit";
import ManagerEdit from "./views/ManagerEdit";
import NotFound from "./views/NotFound";
import AdminPage from "./views/AdminPage";

export const routes = Object.freeze([
    
    {
        path:"/employee",
        component: Employee,
        name: "employee"
    },
    {
        path:"/manager",
        component: Manager,
        name: "manager"
    },
    {
        path:"*",
        component: NotFound,
        name: null
    },
    {
        path:"/NewEmployee/",
        component: EmployeeEdit,
        name: null
    },
    {
        path:"/EditEmployee/:id",
        component: EmployeeEdit,
        name: null
    },
    {
        path:"/NewManager/",
        component: ManagerEdit,
        name: null
    },
    {
        path:"/EditManager/:id",
        component: ManagerEdit,
        name: null
    },
    {
        path: "/AdminPage",
        component: AdminPage,
        name: "AdminPage"
    }
]);