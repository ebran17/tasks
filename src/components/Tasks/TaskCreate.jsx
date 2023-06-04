import { useState, useContext } from "react"
import { TasksContext } from "../../context/TaskContext";
import { Button, TextField } from "@mui/material";
import "./TaskCreate.css";

function TaskCreate() {
    const { state, setState } = useContext(TasksContext);

    const [task, setTask] = useState({
        title: "",
        description: "",
        status: "PENDING"
    });

    const addNewTask = async () => {
        const response = await fetch("https://apqivc1rj9.execute-api.us-east-1.amazonaws.com/task", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });
        const json = await response.json();
        let newTaskList = [...state.taskList];
        newTaskList.push(json);
        setState({...state.taskList, taskList: newTaskList});
    }

    return (
        <div className="containerForm">
            <TextField
                required
                id="outlined-required"
                label="Title"
                defaultValue={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
            />
            <TextField
                required
                id="outlined-required"
                label="Description"
                defaultValue={task.description}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
            />
            <Button variant="contained" onClick={addNewTask}>SUBMIT</Button>
        </div>
    )
}

export default TaskCreate;