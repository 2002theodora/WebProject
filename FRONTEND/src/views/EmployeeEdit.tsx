import { ChangeEvent, useEffect, useState } from "react"
import { Employee } from "../models/Employee"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate, useParams } from "react-router-dom";
import { post, get, put } from "../api/Calls";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Task } from "../models/Task";
import _ from 'lodash';
import EditIcon from '@mui/icons-material/Edit';

export default function EmployeeEdit() {
    const [employee, setEmployee] = useState<Employee>({
        EmployeeId: 0,
        EmployeeName: "",
        EmployeeSurName: "",
        EmployeeAge: 0,
        EmployeeOccupation: "",
        EmployeePhone: "",
        EmployeeEmail: "",
        Tasks: [],
        username: "",
        password: ""
    })

    const [task, setTask] = useState<Task>({
        TaskId: 0,
        TaskDetail: "",
        TaskAssignmentDate: "",
        TaskDeadline: "",
        EmployeeId: 0
    })

    const navigation = useNavigate();
    const {id} = useParams();   

    const [isNewTask, setIsNewTask] = useState<boolean>(true);
    const [taskIndex, setTaskIndex] = useState<number>(0);

    useEffect(() => {
        if (!id)
            return;

        get("/employee", null, id)
        .then(r => setEmployee(r));
    }, [])

    function onChangeEmployee(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();

        if (e.target.name === "EmployeeAge")
            e.target.value = e.target.value.replace(/[^0-9]/g, '');

        setEmployee({ ...employee, [e.target.name]: e.target.value });
    }

    async function saveEmployee() {
        if (!id){
            await post("/employee", employee);
        }
        else{
            await put("/employee", employee.EmployeeId, employee);
        }
        navigation("/Employee");
    }

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setTask({ 
            TaskId: 0,
            TaskDetail: "",
            TaskAssignmentDate: "",
            TaskDeadline: "",
            EmployeeId: id ?  Number(id) : 0
        })
        setIsNewTask(true)
    };

    const handleClose = () => {
        setOpen(false);
    };

    function saveTask(){
        handleClose();
        if (isNewTask)
        {
            const newTask = _.cloneDeep(employee.Tasks);
            newTask.push(task);
            setEmployee({...employee, Tasks: newTask});
        }
        else
        {
            let newTask = _.cloneDeep(employee.Tasks);
            newTask = newTask.map((a, index) => (index === taskIndex ? task : a));
            setEmployee({...employee, Tasks: newTask});
        }   
    }

    function onChangeTask(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setTask({ ...task, [e.target.name]: e.target.value });
    }

    function deleteTask(index: number){
        const newTask = _.cloneDeep(employee.Tasks)
        newTask.splice(index, 1);
        setEmployee({...employee, Tasks: newTask});
    }

    function editTask(index: number){
        setOpen(true);
        const currentTask = employee.Tasks[index];
        setTask(currentTask);
        setIsNewTask(false);
        setTaskIndex(index);
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
        >
            <div>
                <TextField
                    label="EmployeeName"
                    size="small"
                    value={employee.EmployeeName}
                    onChange={onChangeEmployee}
                    name="EmployeeName"
                />
                <TextField
                    label="EmployeeSurName"
                    size="small"
                    value={employee.EmployeeSurName}
                    onChange={onChangeEmployee}
                    name="EmployeeSurName"
                />
            </div>
            <div>
                <TextField
                    label="EmployeeAge"
                    size="small"
                    value={employee.EmployeeAge}
                    onChange={onChangeEmployee}
                    name="EmployeeAge"
                    inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                    }}
                />
                <TextField
                    label="EmployeeOccupation"
                    size="small"
                    value={employee.EmployeeOccupation}
                    onChange={onChangeEmployee}
                    name="EmployeeOccupation"
                />
            </div>
            <div>
                <TextField
                    label="EmployeePhone"
                    size="small"
                    value={employee.EmployeePhone}
                    onChange={onChangeEmployee}
                    name="EmployeePhone"
                />
                <TextField
                    label="EmployeeEmail"
                    size="small"
                    value={employee.EmployeeEmail}
                    onChange={onChangeEmployee}
                    name="EmployeeEmail"
                />
            </div>

            <div>
                <TextField
                    label="username"
                    size="small"
                    value={employee.username}
                    onChange={onChangeEmployee}
                    name="username"
                />
                <TextField
                    label="password"
                    size="small"
                    value={employee.password}
                    onChange={onChangeEmployee}
                    name="password"
                />
            </div>

            <div>
                <Button
                    startIcon={<SaveIcon />}
                    variant="contained"
                    color="success"
                    style={{ marginRight: '8px' }}
                    onClick={saveEmployee}
                >
                    Save
                </Button>
                <Button
                    startIcon={<CancelIcon />}
                    variant="contained"
                    color="error"
                    onClick={() => navigation(-1)}
                >
                    Cancel
                </Button>
            </div>

            <div>
                <h1>Employee Tasks</h1>

                <div>
                    <Button
                        startIcon={<AddCircleIcon />}
                        variant="contained"
                        onClick={handleClickOpen}
                    >
                        Add new task
                    </Button>

                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Employee Task</DialogTitle>
                        <DialogContent>
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                }}
                                noValidate
                            >
                                <TextField
                                    label="TaskDetail"
                                    value={task.TaskDetail}
                                    onChange={onChangeTask}
                                    name="TaskDetail"
                                />
                                <TextField
                                    label="AssignmentDate"
                                    value={task.TaskAssignmentDate}
                                    onChange={onChangeTask}
                                    name="AssignmentDate"
                                />
                                <TextField
                                    label="TaskDeadline"
                                    value={task.TaskDeadline}
                                    onChange={onChangeTask}
                                    name="TaskDeadline"
                                />
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={saveTask}>Save</Button>
                        </DialogActions>
                    </Dialog>
                </div>

                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>TaskDetail</TableCell>
                                <TableCell>TaskAssignmentDate</TableCell>
                                <TableCell>TaskDeadline</TableCell>
                                <TableCell>Edit</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employee.Tasks.map((row, index) => (
                                <TableRow key={index} >
                                    <TableCell>{row.TaskDetail}</TableCell>
                                    <TableCell>{row.TaskAssignmentDate}</TableCell>
                                    <TableCell>{row.TaskDeadline}</TableCell>
                                    <TableCell><Button startIcon={<EditIcon/>} color="success" onClick={() => editTask(index)}/></TableCell>
                                    <TableCell><Button startIcon={<CancelIcon/>} color="error" onClick={() => deleteTask(index)} /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Box>
    );
}