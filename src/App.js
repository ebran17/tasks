import './App.css';
import Tasks from './components/Tasks';
import { TasksProvider } from './context/TaskContext';

function App() {
  return (
    <div className="App">
      <TasksProvider>
        <Tasks />
      </TasksProvider>
    </div>
  );
}

export default App;
