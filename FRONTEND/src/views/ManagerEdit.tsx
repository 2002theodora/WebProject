import { ChangeEvent, useEffect, useState } from "react"
import { Manager } from "../models/Manager"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate, useParams } from "react-router-dom";
import { post, get, put } from "../api/Calls";
import { Employee } from "../models/Employee";
import _ from 'lodash';
import EditIcon from '@mui/icons-material/Edit';

export default function ManagerEdit() {
    const [manager, setManager] = useState<Manager>({
        ManagerId: 0,
        ManagerName: "",
        ManagerSurName: "",
        ManagerAge:0,
        ManagerDepartment: "",
        ManagerPhone: "",
        ManagerEmail: "",
        Employees: []
    })

    const navigation = useNavigate();
    const {id} = useParams(); 

    useEffect(() => {
        if (!id)
            return;

        get("/manager", null, id)
        .then(r => setManager(r));
    }, [])

    function onChangeManager(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();

        if (e.target.name === "ManagerAge")
            e.target.value = e.target.value.replace(/[^0-9]/g, '');

        setManager({ ...manager, [e.target.name]: e.target.value });
    }

    async function saveManager() {
        if (!id){
            await post("/manager", manager);
        }
        else{
            await put("/manager", manager.ManagerId, manager);
        }
        navigation("/Manager");
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
                    label="ManagerName"
                    size="small"
                    value={manager.ManagerName}
                    onChange={onChangeManager}
                    name="ManagerName"
                />
                <TextField
                    label="ManagerSurName"
                    size="small"
                    value={manager.ManagerSurName}
                    onChange={onChangeManager}
                    name="ManagerSurName"
                />
            </div>
            <div>
                <TextField
                    label="ManagerAge"
                    size="small"
                    value={manager.ManagerAge}
                    onChange={onChangeManager}
                    name="ManagerAge"
                    inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                    }}
                />
                <TextField
                    label="ManagerDepartment"
                    size="small"
                    value={manager.ManagerDepartment}
                    onChange={onChangeManager}
                    name="ManagerDepartment"
                />
            </div>
            <div>
                <TextField
                    label="ManagerPhone"
                    size="small"
                    value={manager.ManagerPhone}
                    onChange={onChangeManager}
                    name="ManagerPhone"
                />
                <TextField
                    label="ManagerEmail"
                    size="small"
                    value={manager.ManagerEmail}
                    onChange={onChangeManager}
                    name="ManagerEmail"
                />
            </div>

            <div>
                <Button
                    startIcon={<SaveIcon />}
                    variant="contained"
                    color="success"
                    style={{ marginRight: '8px' }}
                    onClick={saveManager}
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

        </Box>
    );
}