import {useState} from 'react'
import axios from 'axios'
import { Navigate, NavLink } from 'react-router-dom';
import './Assets/css/App.css'

// function Login(){
//  const post = (url) => {
//   axios.post(url, {'username':username, 'password':password})
//       .then(function(response){
//        console.log(response.data);
//       })
//       .catch(function(error){
//        console.log(error);
//       });
//  }

const Login = (props) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [loginStart, setLoginStart] = useState();
    const post = (url) => {
        axios.post(url, { 'username': username, 'password': password }).then(response => {
            localStorage.setItem('token', response.data['token']);
            console.log(localStorage.getItem('token'));
            localStorage.setItem('id_user', response.data['user_id']);
            console.log(localStorage.getItem('id_user'));
            localStorage.setItem('username', response.data['username'])
            console.log(localStorage.getItem('username'))
            localStorage.setItem('first_name', response.data['first_name']);
            console.log(localStorage.getItem('first_name'));
            localStorage.setItem('last_name', response.data['last_name']);
            console.log(localStorage.getItem('last_name'));
            localStorage.setItem('email', response.data['email']);
            console.log(localStorage.getItem('email'));
            setLoginStart(2);
        })
    }
    return (
        <div className={"contLogin"}>
            <h1>Login</h1>
            <h3>Username</h3>
            <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
            <h3>Password</h3>
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <button onClick={() => post('http://localhost:8000/api/v1/login/')}>Login </button>
            {(localStorage.getItem('token')!==null || loginStart===2) && <Navigate to={'/profile/'}/>} 
            <p></p>
            <h2>Necesita</h2>
            <NavLink to="/register">Crear cuenta</NavLink>
        </div>
    )
}


export default Login;