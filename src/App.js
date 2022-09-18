import React,{useState} from 'react';
import './App.css';

import AddUser from './component/AddUser';

function App() {
  const [showForm, setShowForm] = useState(false)
  return (
    <div className="App">
      <div className='btn_container '>
        <button className='btn' onClick={() => setShowForm(!showForm)}>Add User</button>
      </div>

      {showForm && <AddUser />}
    </div>
  );
}

export default App;
