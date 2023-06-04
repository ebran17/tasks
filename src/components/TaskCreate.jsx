import { useState } from "react"
import "./TaskCreate.css"

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
            <div className="rowForm">
                <label>Title:</label>
                <input type="text" value={task.title} onChange={(e) => setTask({ ...task, title: e.target.value })}></input>
            </div>
            <div className="rowForm">
                <label>Description:</label>
                <input type="text" value={task.description} onChange={(e) => setTask({ ...task, description: e.target.value })}></input>
            </div>
            <button onClick={addNewTask}>SUBMIT</button>
        </div>
    )
}

export default TaskCreate;