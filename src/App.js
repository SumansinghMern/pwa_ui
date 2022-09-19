import React,{useState,useEffect} from 'react';
import './App.css';

import AddUser from './component/AddUser';
import UserList from './component/UserList';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [users,setAllUsers] = useState([]);

  const onSubmit = (formData) => {

    if (navigator.onLine){
      fetch('http://localhost:5000/addUser',{
              method:'POST',
              body:formData
          })
          .then((res) => {
              return res.json()
          })
          .then((data) => {
            console.log(data)
            setShowForm(!showForm);
            fetchAllUSers()
          })
    }else(
      console.log(formData, "Ofline---------",formData.profile)
    )
  }

  const fetchAllUSers = () => {
    fetch('http://localhost:5000/getUsers')
      .then((res) => res.json())
      .then((usersData) => {
        usersData && usersData.data && usersData.data.length && setAllUsers(usersData.data)
      })
  }

  useEffect(() => {
    fetchAllUSers();

    window.addEventListener("load", (event) => {
      const statusDisplay = document.getElementById("status");
      statusDisplay.textContent = navigator.onLine ? "Online" : "OFFline";
    }); 
  },[])

  console.log(users,"----------------------users")

  return (
    <div className="App">
      <div id='status'></div>
      {!showForm &&<div className='btn_container '>
        <button className='btn' onClick={() => setShowForm(!showForm)}>Add User</button>
      </div>}

      {showForm && <AddUser onSubmitForm={onSubmit} />}
      <div className='userList cointaner'>
        {users && users.length &&<UserList users={users}/>}
      </div>
    </div>
  );
}

export default App;
