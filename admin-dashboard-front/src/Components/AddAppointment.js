import React, { useState } from "react";
import './add.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import { Cookies } from "react-cookie";
import APIService from "./APIService";
function AddAppointment(props){
    const cookies = new Cookies()
    const TOKEN = cookies.get('AuthToken')
    const [Pid, setPid] = useState('')
    const [Did, setDid] = useState('')
    const [date, setDate] = useState('')
    const Appointment = {
        "doctorId": Did,
        "appointmentDate": date + ".959Z"
    }
    const ConfirmEvent = async () => {
        const response = await APIService.PostAppointment(TOKEN, Pid, Appointment)
        try{
            if(response.status === 201){
                alert("Appointment added successfully")
            }
            else{
                alert("Invalid Date")
            }
        }
        catch(error){
            alert("invalid Date")
        }
    }
    return props.Trigger ? (
        <div className="add-popup">
            <div className="add-popup-inner" style={{height  : "270px"}}>
                <div className="add-header-container">
                <h1 id="add-txt">Add Appointment</h1>
                    <div className="cross-container" onClick={()=>props.setTrigger(false)}>
                        <FontAwesomeIcon icon="fa-solid fa-xmark" />
                    </div>
                        <TextField id="outlined-number" type="number" label="Patient Id" variant="outlined" onChange={e=>setPid(e.target.value)} style={{marginTop : "25px", marginLeft : "30%"}}/>
                    <div add-input-container style={{marginTop : "10px", display : "flex", gap : "10px", marginLeft : "10%"}}>
                        <TextField id="outlined-number" type="number" label="Doctor Id" variant="outlined" onChange={e=>setDid(e.target.value)}/>
                        <TextField id="outlined-basic" label="Appointment Date" variant="outlined" onChange={e=>setDate(e.target.value)}/>
                    </div>
                    <Button variant="contained" style={{marginLeft : "40%", marginTop : "30px"}} onClick={ConfirmEvent}>Confirm</Button>
                </div>
            </div>
        </div>
    )
    :
    ""
}
export default AddAppointment
