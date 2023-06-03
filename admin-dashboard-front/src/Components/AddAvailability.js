import React, { useState } from "react";
import './add.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import { Cookies } from "react-cookie";
import APIService from "./APIService";
function AddAvailability(props){
    const cookies = new Cookies()
    const TOKEN = cookies.get('AuthToken')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [ID, setID] = useState()
    const Body = {
        "startDate" : start + ".654Z",
        "endDate" : end + ".654Z"
    }

    const ConfirmEvent = async() => {
        const response = await APIService.PostAvailability(TOKEN, ID, Body)
        try{
                if(response.status === 201){
                    alert("Availability added successfully...")
                    window.location.reload()
                }
                else {
                    alert("invalid date")
                }
        }catch(error){
            if(response.message === undefined){
                alert(`Availability with start date ${start} and end date ${end} overlaps with other existing date range`)
            }
            else{
                alert(response.message)
            }
        }
    }
    return props.Trigger ? (
        <div className="add-popup">
            <div className="add-popup-inner" style={{height  : "270px"}}>
                <div className="add-header-container">
                <h1 id="add-txt">Add Availability</h1>
                    <div className="cross-container" onClick={()=>props.setTrigger(false)}>
                        <FontAwesomeIcon icon="fa-solid fa-xmark" />
                    </div>
                        <TextField id="outlined-number" type="number" label="Doctor Id" variant="outlined" onChange={e=>setID(e.target.value)} style={{marginTop : "25px", marginLeft : "30%"}}/>
                    <div add-input-container style={{marginTop : "10px", display : "flex", gap : "10px", marginLeft : "10%"}}>
                        <TextField id="outlined-basic" label="StartDate" variant="outlined" helperText="Format: YY-MM-DDTHH:MM:SS" onChange={e=>setStart(e.target.value)}/>
                        <TextField id="outlined-basic" label="EndDate" variant="outlined" helperText="Format: YY-MM-DDTHH:MM:SS" onChange={e=>setEnd(e.target.value)}/>
                    </div>
                    <Button variant="contained" style={{marginLeft : "40%", marginTop : "30px"}} onClick={ConfirmEvent}>Confirm</Button>
                </div>
            </div>
        </div>
    )
    :
    ""
}
export default AddAvailability
