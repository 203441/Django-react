import axios from "axios";
import React from "react";
import { Navigate } from "react-router-dom";
import { useState,useEffect } from "react";
export default function Profiles(){
    const [url, setUrl] = useState('');
    const [image, setImage]=useState(null);
    const [log, setLog]=useState(false)
    useEffect(() => {
        document.title='Profile'
        get_image()
    }, []);

    let get_image = ()=>{
        axios.get('http://localhost:8000/api/image/'+localStorage.getItem('id_user')+'/',{
            headers:{
                'Authorization': 'Token '+localStorage.getItem('token')
            },
        }).then(response=>{
            setUrl('http://localhost:8000/api/v1/'+response.data['name_img'])
        }).catch(()=>{
            setUrl('https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg')
        })
    }
    let post_image = ()=>{
        let data = new FormData();
        data.append('name_img',image)
        data.append('id_user',localStorage.getItem('id_user'))
        axios.post('http://localhost:8000/api/image/',data,{
            headers: {
                'Content-type':'multipart/form-data',
                'Authorization': 'Token '+localStorage.getItem('token'),
            },
        }).then(()=>{
            
            get_image()
        }).catch(error=>{
            console.log(error)
        })
    }

    let put_image = ()=>{
        let data = new FormData();
        data.append('name_img',image)
        axios.put('http://localhost:8000/image/'+localStorage.getItem('id_user')+'/',data,{
            headers: {
                'Content-type':'multipart/form-data',
                'Authorization': 'Token '+localStorage.getItem('token'),
            },
        }).then((response)=>{
            
            get_image()
        })
    }

    let delete_Img = ()=>{
        axios.delete('http://localhost:8000/image/'+localStorage.getItem('id_user')+'/',{
            headers: {
                'Authorization': 'Token '+localStorage.getItem('token'),
            },
        }).then(()=>{
            get_image()
        }).catch(e=>{
            alert('inserta una imagen para eliminar')
        })
    }

    let setDatos = ()=>{
        let data = {
            'username': document.getElementById('usernameP').value!== '' ? document.getElementById('usernameP').value : localStorage.getItem('username'),
            'first_name': document.getElementById('first_nameP').value !== '' ? document.getElementById('first_nameP').value:  localStorage.getItem('first_name'),
            'last_name': document.getElementById('last_nameP').value !== '' ? document.getElementById('last_nameP').value: localStorage.getItem('last_name'),
            'email': document.getElementById('emailP').value!=='' ? document.getElementById('emailP').value: localStorage.getItem('email')
        }
        axios.put('http://localhost:8000/modificate/'+localStorage.getItem('id_user')+'/',data,{
            headers:{
                'Authorization': 'Token '+localStorage.getItem('token'),
            },
        }).then(response=>{
            
            localStorage.setItem('username',response.data['username']);
            localStorage.setItem('first_name',response.data['first_name']);
            localStorage.setItem('last_name', response.data['last_name']);
            localStorage.setItem('email',response.data['email']);
            document.getElementById('usernameP').value=''
            document.getElementById('first_nameP').value=''
            document.getElementById('last_nameP').value=''
            document.getElementById('emailP').value=''
            document.getElementById('usernameP').placeholder=localStorage.getItem('username')
            document.getElementById('first_nameP').placeholder=localStorage.getItem('first_name')
            document.getElementById('last_nameP').placeholder=localStorage.getItem('last_name')
            document.getElementById('emailP').placeholder=localStorage.getItem('email')
        })
    }

    return (
        <div className="container profile">
            <div className="image">
                <img src={url} />
            </div>
            <div className="functionalities">
                <input type="file" onChange={e=>{setImage(e.target.files[0])}}/>
                <button className="add" onClick={()=>{
                    if (image!==null){
                        if (url!=='https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg'){
                            put_image()
                        }else{
                            post_image()
                        }
                    }
                }}>Agregar</button>
                <button className="delete" onClick={()=>{
                    delete_Img()
                }}>Eliminar</button>

                <div className="inputs">
                    <input id="usernameP" type={'text'} placeholder={localStorage.getItem('username')} />
                    <input id="emailP" type={'text'} placeholder={localStorage.getItem('email')} />
                    <input id="first_nameP" type={'text'} placeholder={localStorage.getItem('first_name')} />
                    <input id="last_nameP" type={'text'} placeholder={localStorage.getItem('last_name')}/>       
                </div>
                <button className="update" onClick={()=>{
                    setDatos()
                }}>Actualizar datos</button>
                <button className="btnCe1" onClick={()=>{
                            localStorage.clear()
                            setLog(true)
                        }} >Cerrar Sesi??n</button>
                {(!localStorage.getItem('token') || log) && <Navigate to={'/login'}/>}
            </div>
        </div>
    );
}