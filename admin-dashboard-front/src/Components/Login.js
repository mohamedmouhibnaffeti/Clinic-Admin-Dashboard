import React, { useState } from "react";
import './Login.css'
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import APIService from "./APIService";
function Login(){
    const [Email, setEmail] = useState('')
    const [Wrong, setWrong] = useState(false)
    const [Password, setPassword] = useState('')
    const [AuthToken, setAuthToken] = useCookies(['AuthToken']) 
    const Navigate = useNavigate()

    const HandleEmailChange = (e) =>{
        setEmail(e.target.value)
        setWrong(false)
    }

    const HandlePasswordChange = (e) =>{
        setPassword(e.target.value)
        setWrong(false)
    }

    const HandleLogin = async() => {
        const User = {
            email : Email,
            password : Password
        }
        const response = await APIService.Authenticate(User)
        if(response.status === 201){
            setAuthToken('AuthToken',response.data.token)
            Navigate("/AdminDashboard")
        }
        else{
            setWrong(true)
        }
    }
    return(
        <div className="login-page">
            <div className="login-input-container">
            <TextField id="email" label="Email" variant="outlined" error={Wrong} helperText={Wrong ? "Wrong Email..." : ""} defaultValue="" onChange={HandleEmailChange}/>

                <TextField error={Wrong} id="outlined-password-input" label="Password" type="password" autoComplete="current-password" helperText={Wrong ? "Wrong Password..." : ""} onChange={HandlePasswordChange} />
                <Button id="login-btn" variant="contained"  onClick={HandleLogin} endIcon={<SendIcon />}>Login</Button>
            </div>
        </div>
    )
}
export default Login

//<NavLink to="/AdminDashboard" style={{textDecoration : 'none'}}></NavLink>