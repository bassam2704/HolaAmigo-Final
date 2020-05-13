import React,{useState,useContext} from 'react';
import {Link,useHistory,useParams} from 'react-router-dom'
import M from 'materialize-css'
const Login=()=>{
    
    const history=useHistory()
    //const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    const {token}=useParams()

    const PostData =()=>{
       
        fetch("/new-password",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                token
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                // localStorage.setItem("jwt",data.token)
                // localStorage.setItem("user",JSON.stringify(data.user))
                // dispatch({type:"USER",payload:data.user})
                M.toast({html: data.message,classes:"#43a047 green darken-1"})
                history.push('/signin')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    return(
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>HolaAmigo !</h2>
                {/* <input type="email" 
                placeholder="email"
                value={email} 
                onChange={(e)=>setEmail(e.target.value)}/> */}
                <input type="password" 
                placeholder="enter a new password"
                value={password} 
                onChange={(e)=>setPassword(e.target.value)}/>
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>PostData()}>Update password
                </button>
               
            </div>
        </div>
    )
}

export default Login;