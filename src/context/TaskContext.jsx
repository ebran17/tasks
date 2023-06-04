import { createContext, useState } from "react";

export const TasksContext = createContext();

export function TasksProvider({children}){
    const initialState = {
        taskList: []
    }
    const [state, setState] = useState(initialState);
    
    return(
        <TasksContext.Provider value={{
            state,
            setState
        }}>
            {children}
        </TasksContext.Provider>
    )
}