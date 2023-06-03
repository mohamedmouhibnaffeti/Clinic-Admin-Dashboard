import './AdminPanel.css'
import React, {useState, Component} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import appointment from './Images/Appointment.jpg';
import availability from './Images/availability.svg';
import doctor from './Images/doctor.svg';
import patient from './Images/patient.svg'
import CustomPaginationActionsTable from './Table'
import { TextField } from '@mui/material';
import OneRow from './DataRow';
import APIService from './APIService';
import { Cookies } from 'react-cookie';
import AddDoctor from './AddDoctor';
import AddAvailability from './AddAvailability';
import AddPatient from './AddPatient';
import AddAppointment from './AddAppointment';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import bills from './Images/bills.jpg'
function AdminPanel(){
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };


  
    const [BillsFound, setBillsFound] = useState(true)
    const [BillsTrigger, setBillsTrigger] = useState(false)
    const [appTrigger, setAppTrigger] = useState(false)
    const [getApp, setGetApp] = useState(true)
    const [appFound, setAppFound] = useState(false)
    const [AddDocTrigger, setAddDocTrigger] = useState(false)
    const [AddPatTrigger, setAddPatTrigger] = useState(false)

    const [DoctorTableAppears, setTDoctorableAppears] = useState(false)
    const [PatientTableAppears, setPatientRowsAppears] = useState(false)
    const [Status, setStatus] = useState('')
    const [RowAppears, setRowAppears] = useState(false)
    const [AvailabilitiesAdd, setAvailabilitiesAdd] = useState(false)

    const [rows, setRows] = useState([])
    const [ItemToFind, setItemToFind] = useState([])
    const [DoctorFound, setDoctorFound] = useState(true)
    const [PatientFound, setPatientFound] = useState(true)
    

    const cookies = new Cookies()
    const TOKEN = cookies.get('AuthToken')
    
    const HandleGetDoctors = async() =>{
      setItemToFind()
      setTDoctorableAppears(!DoctorTableAppears)
      setPatientRowsAppears(false)
      const response = await APIService.GetDoctors(TOKEN)
      const doctorWithoutAvailabilities = response.data.items.map(item => {
        const {bills, ...doctorWithoutBills} = item
        const {availabilities, ...doctorWithoutAvailabilities} = doctorWithoutBills
        const {iban, ...doctorWithoutIbans} = doctorWithoutAvailabilities
        return doctorWithoutIbans
      })
      setRows(doctorWithoutAvailabilities)
    }
    

    const HandleGetPatients = async () =>{
      setItemToFind()
      setPatientRowsAppears(!PatientTableAppears)
      setTDoctorableAppears(false)
        const response = await APIService.GetPatients(TOKEN)
        const PatientWithoutAppointments = response.data.items.map(item => {
          const {appointments, ...Patient} = item
          return Patient
        })
        setRows(PatientWithoutAppointments)
    }

    const HandleGetOneDoctor = async (e) =>{
        setTDoctorableAppears(false)
        setPatientRowsAppears(false)
        setGetApp(true)
        setAppFound(false)
        setBillsTrigger(false)
        try {
          setStatus('doctor')
          setDoctorFound(false);
          setItemToFind([]);
          console.log(e.target.value.length)
          if(e.target.value.length>0){
            const response = await APIService.GetDoctorsById(TOKEN, e.target.value)
          if(response.status === 200){
            const {bills, ...doctorWithoutBills} = response.data
            const {availabilities, ...doctorWithoutAvailabilities} = doctorWithoutBills
            const {iban, ...doctorWithoutIbans} = doctorWithoutAvailabilities
            setItemToFind(doctorWithoutIbans)
            setDoctorFound(true)
          }
          else{
            setDoctorFound(false);
          }
          }
          else{
            setDoctorFound(true)
          }
        } catch (error) {
          console.error('Error fetching patient data:', error);
          setDoctorFound(false)
        }
    }

    const handleGetAppointment = async(e)=>{
      setItemToFind([])
      setTDoctorableAppears(false)
      setPatientRowsAppears(false)
      setBillsTrigger(false)
      try{
        if(e.target.value.length > 0 ){
          const response = await APIService.GetAppointment(TOKEN, e.target.value)
          if(response.status === 200){
            setRows(response.data)
            setGetApp(true)
            setAppFound(true)
          }
          else{
            setGetApp(false)
            setAppFound(false)
          }
        }
        else{
          setGetApp(false)
          setAppFound(false)
        }
      }catch(error){
        console.error('Error fetching Appointments data:', error);
        setGetApp(false)
      }
    }
    const HandleGetOnePatient = async (e) =>{
        setGetApp(true)
        setAppFound(false)
        setBillsTrigger(false)
        try {
          setStatus('patient')
          setPatientFound(false);
          setItemToFind([]);
          if(e.target.value.length>0){
            const response = await APIService.GetPatientsById(TOKEN, e.target.value);
          if(response.status === 200){
            const {appointments, ...PatientWithoutAppointments} = response.data
            setItemToFind(PatientWithoutAppointments);
            setPatientFound(true);
          }
          else{
            setPatientFound(false);
          }
          }
          else{
            setPatientFound(true)
          }
        } catch (error) {
          console.error('Error fetching patient data:', error);
          setPatientFound(false)
        }
    }

    const handleGetBills = async (e) => {
      setItemToFind([])
      setTDoctorableAppears(false)
      setPatientRowsAppears(false)
      setAppFound(false)
      try{
        if(e.target.value.length > 0 ){
          const response = await APIService.GetBills(TOKEN, e.target.value) 
          if(response.status === 200){
            setBillsFound(true)
            setBillsTrigger(true)
            setRows(response.data)
          }else{
            setBillsFound(false)
            setBillsTrigger(false)
          }
        }
        else{
          setBillsFound(false)
          setBillsTrigger(false)
        }
      }catch(error){
        console.error('Error fetching Bills data:', error);
        setBillsFound(false)
        setBillsTrigger(false)
      }
    }

    return(
        <div className='panel-container'>
            
            <h1>Clinic Management : </h1>
            <div style={{marginLeft : "5%"}}>
            <Carousel responsive={responsive}>
            <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 210 }}
                image={appointment}
                title="Appointments"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Appointments
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Manage all scheduled meetings between patients and medical professionals
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={()=>setAppTrigger(true)}>Add Appointment</Button>
                <TextField style={{height : '10px', translate : '30px -28px', width : '130px'}}
                            Doctorid="standard-basic" label="Doctor ID"
                            variant="standard"
                            error={!getApp}
                            onChange={handleGetAppointment}
                            
                />
            </CardActions>
            </Card>


            <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 210 }}
                image={availability}
                title="Availabilities"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Availabilities
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Manage all times when a doctor is available to see patients for medical consultations.
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={()=>setAvailabilitiesAdd(true)}>Add Availability</Button>
            </CardActions>
            </Card>


            <Card sx={{ maxWidth: 345, height : "369px" }}>
            <CardMedia
                sx={{ height: 210 }}
                image={bills}
                title="Bills"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Bills
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Detailed medical bill listing treatments, medications, and costs for patient's healthcare.
                </Typography>
            </CardContent>
            <CardActions>
                <TextField error={!BillsFound} style={{height : '10px', translate : '30px -28px', width : '150px'}}
                            Doctorid="standard-basic" label="Enter Doctor ID"
                            variant="standard" onChange={handleGetBills} 
                />
            </CardActions>
            </Card>

            <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 210 }}
                image={doctor}
                title="Doctors"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Doctors
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Manage all medical personnel and see their associated patients.
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={HandleGetDoctors}>Get All</Button>
                <Button size="small" onClick={()=>setAddDocTrigger(true)}>Add Doctor</Button>
                <TextField error={!DoctorFound} style={{height : '10px', translate : '30px -28px', width : '100px'}}
                            Doctorid="standard-basic" label="Get Doctor"
                            variant="standard" onChange={HandleGetOneDoctor} 
                />
            </CardActions>
            </Card>

            <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 210 }}
                image={patient}
                title="Patients"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Patients
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Manage all patients and see their associated doctor.
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={HandleGetPatients}>Get All</Button>
                <Button size="small" onClick={()=>setAddPatTrigger(true)}>Add Patient</Button>
                <TextField  error={!PatientFound} style={{height : '10px', translate : '30px -28px', width : '100px'}}
                            Doctorid="standard-basic" label="Get Patient"
                            variant="standard" onChange={HandleGetOnePatient} 
                />
            </CardActions>
            </Card>
              </Carousel>
              </div>
            {rows.length > 0 && (DoctorTableAppears || PatientTableAppears || appFound || BillsTrigger) && <CustomPaginationActionsTable rows={rows}/>}
            {ItemToFind ? <OneRow item={ItemToFind} status={Status} /> : ""}
            { AddDocTrigger && <AddDoctor Trigger={AddDocTrigger} setTrigger={setAddDocTrigger}/> }
            { AddPatTrigger && <AddPatient Trigger={AddPatTrigger} setTrigger={setAddPatTrigger} /> }
            { AvailabilitiesAdd && <AddAvailability Trigger={AvailabilitiesAdd} setTrigger={setAvailabilitiesAdd} /> }
            { appTrigger && <AddAppointment Trigger={appTrigger} setTrigger={setAppTrigger} /> }
        </div>
    )
}
export default AdminPanel;
//{rows.length > 0 && (DoctorTableAppears || PatientTableAppears) && <CustomPaginationActionsTable rows={rows}/>}
/*
            <div className='models-container'>
            <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 210 }}
                image={appointment}
                title="Appointments"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Appointments
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Manage all scheduled meetings between patients and medical professionals
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={()=>setAppTrigger(true)}>Add Appointment</Button>
                <TextField style={{height : '10px', translate : '30px -28px', width : '130px'}}
                            Doctorid="standard-basic" label="Doctor ID"
                            variant="standard"
                            error={!getApp}
                            onChange={handleGetAppointment}
                            
                />
            </CardActions>
            </Card>


            <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 210 }}
                image={availability}
                title="Availabilities"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Availabilities
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Manage all times when a doctor is available to see patients for medical consultations.
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={()=>setAvailabilitiesAdd(true)}>Add Availability</Button>
            </CardActions>
            </Card>


            <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 210 }}
                image={doctor}
                title="Doctors"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Doctors
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Manage all medical personnel and see their associated patients.
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={HandleGetDoctors}>Get All</Button>
                <Button size="small" onClick={()=>setAddDocTrigger(true)}>Add Doctor</Button>
                <TextField error={!DoctorFound} style={{height : '10px', translate : '30px -28px', width : '100px'}}
                            Doctorid="standard-basic" label="Get Doctor"
                            variant="standard" onChange={HandleGetOneDoctor} 
                />
            </CardActions>
            </Card>

            <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 210 }}
                image={patient}
                title="Patients"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Patients
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Manage all patients and see their associated doctor.
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={HandleGetPatients}>Get All</Button>
                <Button size="small" onClick={()=>setAddPatTrigger(true)}>Add Patient</Button>
                <TextField  error={!PatientFound} style={{height : '10px', translate : '30px -28px', width : '100px'}}
                            Doctorid="standard-basic" label="Get Patient"
                            variant="standard" onChange={HandleGetOnePatient} 
                />
            </CardActions>
            </Card>
            </div>
*/ 