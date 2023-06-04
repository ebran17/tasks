import { useContext, useEffect } from "react";
import { TasksContext } from "../context/TaskContext";
import TaskCreate from "./TaskCreate";
import TasksList from "./TaskList";

function Tasks() {
    const {state, setState} = useContext(TasksContext);

    useEffect(() => {
        fetch("https://apqivc1rj9.execute-api.us-east-1.amazonaws.com/task")
            .then((response) => response.json())
            .then(({Items}) => setState({...state.taskList, taskList: Items}));
    }, [])

    return (
        <>
            <TaskCreate />
            <TasksList />
        </>
    )
}

export default Tasks;