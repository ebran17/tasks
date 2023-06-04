import { useContext, useEffect } from "react";
import { TasksContext } from "../context/TaskContext";

function TasksList() {
    const { state, setState } = useContext(TasksContext);

    const renderTasks = () => {
        return state.taskList.map(item => {
            return (
                <tr>
                    <td>{item.status}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.submittedOn}</td>
                </tr>
            )
        })
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <td>DONE</td>
                        <td>NAME</td>
                        <td>DESCRIPTION</td>
                        <td>DATE</td>
                    </tr>
                </thead>
                <tbody>
                    {renderTasks()}
                </tbody>
            </table>
        </div>
    )
}

export default TasksList;