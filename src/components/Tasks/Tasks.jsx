import { useContext, useEffect, useState } from "react";
import { TasksContext } from "../../context/TaskContext";
import TaskCreate from "./TaskCreate";
import TasksList from "./TaskList";
import { Container, Button, Divider } from "@mui/material";
import "./Tasks.css";


function Tasks() {
    const { state, setState } = useContext(TasksContext);
    const [showForm, setShowForm] = useState(true);

    useEffect(() => {
        fetch("https://apqivc1rj9.execute-api.us-east-1.amazonaws.com/task")
            .then((response) => response.json())
            .then(({ Items }) => setState({ ...state.taskList, taskList: Items }));
    }, [])

    return (
        <Container>
            <div className="addNewTaskButton">
                {showForm ? <Button variant="contained" onClick={() => setShowForm(false)}>NEW TASK</Button>
                    : <Button variant="contained" color="error" onClick={() => setShowForm(true)}>CANCEL</Button>}
            </div>
            {!showForm ? <TaskCreate /> : <></>}
            <Divider variant="middle" />
            <TasksList />
        </Container>
    )
}

export default Tasks;