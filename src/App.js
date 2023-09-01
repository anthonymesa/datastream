import './App.css';
import QuickAddTaskBar from './features/quickAddTaskBar/QuickAddTaskBar';
import TaskList from './features/taskList/TaskList';

function App() {

  return (
    <div className="App">
      <QuickAddTaskBar />
      <TaskList />
    </div>
  );
}

export default App;
