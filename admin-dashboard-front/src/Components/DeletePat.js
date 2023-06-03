import React, {useState} from "react";
import './delete.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { Cookies } from "react-cookie";
import APIService from "./APIService";
function DeletePatient(props){
    const cookies = new Cookies()
    const TOKEN = cookies.get('AuthToken')
    
    const HandleDelete = async() => {    
        try{
            const response = await APIService.DeletePatient(TOKEN, props.id)
            if(response.status === 204){
                alert('Patient Deleted successfuly')
                window.location.reload()
            }
            else{
                alert('Delete failed please check your data')
            }
        }catch(error){
            alert('Delete failed please check your data')
        }

    }

    return props.Trigger ? (
        <div className="delete-popup">
            <div className="delete-popup-inner">
                <div className="delete-header-container">
                    <div className="cross-container" onClick={()=>props.setTrigger(false)}>
                        <FontAwesomeIcon icon="fa-solid fa-xmark" />
                    </div>
                        <Button variant="contained" style={{marginTop : '0px', width : '250px', margin: '0px 31%'}} onClick={HandleDelete} >Confirm Delete Patient</Button>
                </div>
            </div>
        </div>
    )
    :
    ""
}
export default DeletePatient
