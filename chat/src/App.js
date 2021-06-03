import './App.css';
import { Chatbox } from './components';
import { SocketContext, socket } from './context/socket';

const App = () => {
  return (
    <SocketContext.Provider value={socket} >
      <div className="App">
        <Chatbox />
      </div>
    </SocketContext.Provider>
  );
}

export default App;
