import React from 'react'
const { REACT_APP_API } = process.env;
const UserList = (props) => {

    return (
        props.users.map((user,i) =>{
            return <div key={i} className='userItem'>
                <h3>{user.name}</h3>
                <img src={`${REACT_APP_API}${user.profilImage}`} alt='userProfile' height='60px' width='auto' />
            </div>
        })
    )
}

export default UserList