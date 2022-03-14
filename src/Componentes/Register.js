import {useState} from 'react'
import axios from 'axios'
import { Navigate, NavLink } from 'react-router-dom';

function Register(){
    const post = (url) => {
        axios.post(url, {'email':email, 'username':username, 'first_name':firstName, 'password':password, 'last_name':lastname, 'password2':password2})
            .then(function(response){
                console.log(response.data);
            })
            .catch(function(error){
                console.log(error);
            });
    }

    const [username, setUsername] =useState('')
    const [firstName, setFirstName] =useState('')
    const [lastname, setLastName] = useState();
    const [password, setPassword] =useState('')
    const [password2, setPassword2] = useState();
    const [email, setEmail] =useState('')
    
    return(
        <div className={"contRegister"}>
            <h1>Register</h1>
            <h3>Email</h3>
            <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <h3>Username</h3>
            <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
            <h3>Firts name</h3>
            <input type="text" placeholder="First name" onChange={e => setFirstName(e.target.value)} />
            <h3>Last Name</h3>
            <input type="text" placeholder="Last Name" onChange={e => setLastName(e.target.value)} />
            <h3>Password</h3>
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <h3>Password 2</h3>
            <input type="password" placeholder="Password 2" onChange={e => setPassword2(e.target.value)} />
            <button onClick={ () => post('http://localhost:8000/api/v2/register/')}>Register</button>
            <NavLink to="/login">Regresar</NavLink>
        </div>
            )
}
            export default Register;