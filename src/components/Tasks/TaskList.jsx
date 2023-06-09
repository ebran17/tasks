import { useContext } from "react";
import { TasksContext } from "../../context/TaskContext";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IconButton, Switch } from "@mui/material";
import { Delete } from "@mui/icons-material";
import "./TaskList.css"

function TasksList() {
    const { state, setState } = useContext(TasksContext);

    const updateStatus = async (item, checked) => {
        const response = await fetch("https://apqivc1rj9.execute-api.us-east-1.amazonaws.com/task/" + item.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: item.title,
                description: item.description,
                status: checked ? "DONE" : "PENDING",
                submittedOn: item.submittedOn
            })
        });
        const json = await response.json();
        if (json.type !== undefined && json.type === "success") {
            let newTaskList = [...state.taskList];
            newTaskList.every(newTaskItem => {
                if (newTaskItem.id === item.id) {
                    newTaskItem.status = checked ? "DONE" : "PENDING";
                    return false;
                }
                return true;
            });
            setState({ ...state.taskList, taskList: newTaskList });
        }

    }

    const deleteTask = async (id) => {
        const response = await fetch("https://apqivc1rj9.execute-api.us-east-1.amazonaws.com/task/" + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        if (json.type !== undefined && json.type === "success") {
            setState({ ...state.taskList, taskList: state.taskList.filter(newTaskItem => newTaskItem.id !== id) });
        }
    }

    const renderTasks = () => {
        return state.taskList.map((item, i) => {
            return (
                <TableRow key={i}>
                    <TableCell><Switch checked={item.status === "DONE" ? true : false} onChange={(event) => updateStatus(item, event.target.checked)} /></TableCell>
                    <TableCell className={item.status === "DONE" ? "done" : "pending"}>{item.title}</TableCell>
                    <TableCell className={item.status === "DONE" ? "done" : "pending"}>{item.description}</TableCell>
                    <TableCell className={item.status === "DONE" ? "done" : "pending"}>{item.submittedOn}</TableCell>
                    <TableCell className={item.status === "DONE" ? "done" : "pending"}>
                        <IconButton size="large" onClick={() => deleteTask(item.id)}><Delete fontSize="large" /></IconButton>
                    </TableCell>
                </TableRow>
            )
        })
    }

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><b>DONE</b></TableCell>
                        <TableCell><b>NAME</b></TableCell>
                        <TableCell><b>DESCRIPTION</b></TableCell>
                        <TableCell><b>DATE</b></TableCell>
                        <TableCell><b>DELETE</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderTasks()}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TasksList;