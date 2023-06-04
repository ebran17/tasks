import { useState } from "react"
import "./TaskCreate.css"
import { Button, TextField } from "@mui/material";

function TaskCreate() {
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
            body: JSON.stringify(task) // body data type must match "Content-Type" header
        });
        const json = await response.json();
        console.log(json);
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