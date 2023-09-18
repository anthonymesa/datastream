import './App.css';
import Datastream from './features/Datastream/Datastream';
import ModalActionAdd from './features/ModalActionAdd/ModalActionAdd'
import MenuIcon from './features/MenuIcon/MenuIcon'
import ModalActionEdit from './features/ModalActionEdit/ModalActionEdit'
import DemoModal from './features/DemoModal/DemoModal';
function App() {
  return (
    <div>
      <DemoModal />
      <ModalActionAdd />
      <ModalActionEdit />
      <MenuIcon />
      <Datastream />
    </div>
  );
}

export default App;
