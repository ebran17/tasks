import { useContext } from "react";
import { TasksContext } from "../../context/TaskContext";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function TasksList() {
    const { state } = useContext(TasksContext);

    const renderTasks = () => {
        return state.taskList.map((item, i) => {
            return (
                <TableRow key={i}>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.submittedOn}</TableCell>
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