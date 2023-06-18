import './App.css';
import Tasks from './components/Tasks/Tasks';
import { TasksProvider } from './context/TaskContext';
import CreateRandomCanva from './components/Polotno/CreateRandomCanva';

function App() {
  return (
    <div className="App">
      <TasksProvider>
        <Tasks />
      </TasksProvider>
      <CreateRandomCanva />
    </div>
  );
}

export default App;
