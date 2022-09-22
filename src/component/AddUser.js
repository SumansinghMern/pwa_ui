import React,{ useState } from "react"

const AddUser = (props) => {

    const [name, changeName] = useState('')
    const [email, changeEmail] = useState('')
    const [profile, changeProfile] = useState({})
    const [phone, changePhone] = useState('')


    const changeInput = (value, name) => {
        if (name === 'name') {
            changeName(value)
        }
        if (name === 'email') {
            changeEmail(value)
        }
        if (name === 'profile') {
            changeProfile(value[0])
        }
        if (name = 'phone') {
            changePhone(value)
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(name, email, phone, profile)
        const formData = new FormData();
        formData.append('name',name);
        formData.append('email',email);
        formData.append('phone',phone)
        formData.append('profile',profile)

        props.onSubmitForm(formData)

    }

    return (
        <form 
            class="product-form" 
            onSubmit={(e) => onSubmit(e)}
            >
            <div class="form-control">
                <label for="title">Name</label>
                <input type="text" name="name" onChange={(e) => changeInput(e.target.value, 'name')} id="title" value={name} />
            </div>
            <div class="form-control">
                <label for="imageUrl">Email</label>
                <input type="text" name="email" onChange={(e) => changeInput(e.target.value, 'email')} id="imageUrl" value={email} />
            </div>
            <div class="form-control">
                <label for="image">Image</label>
                <input
                    type="file"
                    name="image"
                    onChange={(e) => changeInput(e.target.files, 'profile')}
                    id="image"
                />
            </div>
            <div class="form-control">
                <label for="price">Phone</label>
                <input type="number" name="phone" onChange={(e) => changeInput(e.target.value, 'phone')} id="price" step="0.01" value={phone} />
            </div>

            <button class="btn" type="submit">Submit</button>

        </form>
    )
}

export default AddUser