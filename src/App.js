import './App.css';
import AddTaskBar from './features/addTaskBar/AddTaskBar';
import TaskList from './features/taskList/TaskList';

function App() {

  return (
    <div className="App">
      <AddTaskBar />
      <TaskList />
    </div>
  );
}

export default App;
