import './App.css';
import Datastream from './features/Datastream/Datastream';
import ModalActionAdd from './features/ModalActionAdd/ModalActionAdd'
import MenuIcon from './features/MenuIcon/MenuIcon'
import ModalActionEdit from './features/ModalActionEdit/ModalActionEdit'
import DemoModal from './features/DemoModal/DemoModal';
import Datashed from './features/Datashed/Datashed';
// import '@mantine/carousel/styles.css';

function App() {
  return (
    <div>
      <DemoModal />
      <ModalActionAdd />
      <ModalActionEdit />
      <MenuIcon />
      <Datashed />
      {/* <Datastream /> */}
    </div>
  );
}

export default App;
