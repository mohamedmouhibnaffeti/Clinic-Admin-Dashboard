const express = require('express')
const app = express()
const cors =  require('cors')
const bodyParser = require('body-parser');
app.use(bodyParser.json());

   
app.use(cors({
    origin: "http://localhost:3000"
}))
const axios = require('axios');

//base url for all apis
const URL = "http://clinic-management-service.eu-west-3.elasticbeanstalk.com/clinic-management-service/api/v1"


//url for authentication
AUTH_URL = URL + "/authenticate"
//authenticate
app.post('/authenticate', async(req, res)=>{
  try{
    const response = await axios.post(AUTH_URL, req.body)
    res.status(201).json(response.data)
  }catch(error){
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

//url for specialities api
const SPECIALITIES_URL = URL + "/specialities"

//get specialities 
app.get('/specialities', async (req, res) => {
    try {
      const response = await axios.get(SPECIALITIES_URL);
      res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

//url for patients api
const PATIENTS_URL = URL + "/patients"

//get patients
app.get('/patients', async (req, res) => {
    try {
      const config = {
      headers: { 
        Authorization: `${req.headers.authorization}`,
        'Content-Type': 'application/json' 
      }
        };
      const response = await axios.get(`${PATIENTS_URL}`, config);
      res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

//delete patient
app.delete('/patients/:id', async (req, res) => {
    const patientId = req.params.id;
    try {
      const config = {
        headers: { 
          Authorization: `${req.headers.authorization}`,
          'Content-Type': 'application/json'
        }
      };
      const response = await axios.delete(`${PATIENTS_URL}/${patientId}`, config);
      res.status(204).json({ message: `Patient deleted successfully\n${response}` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});
  
//posting new patient
app.post('/patients', async (req, res) => {
  try {
    const config = {
      headers: {
        Authorization: `${req.headers.authorization}`,
        'Content-Type': 'application/json'
      },
    };
    const body = req.body; // Add this line to read the request body
    const response = await axios.post(PATIENTS_URL, body, config);
    res.status(201).json(response.data);
    console.log(response.status)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

//get patient by id
app.get('/patients/:id', async (req, res) => {
    const patientId = req.params.id
    try {
      const config = {
      headers: { 
        Authorization: `${req.headers.authorization}`,
        'Content-Type': 'application/json'
     }
      };
      const response = await axios.get(`${PATIENTS_URL}/${patientId}`, config);
      res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

//edit a patient:
app.put('/patients/:id', async (req, res) => {
  const patientId = req.params.id;
  try {
    const config = {
    headers: { 
      Authorization: `${req.headers.authorization}`,
      'Content-Type': 'application/json'
   }
    };
    const response = await axios.put(`${PATIENTS_URL}/${patientId}`, req.body, config);
    res.status(204).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


//Above is all patients methods


//From here is Doctors Management

DOCTORS_URL = URL + '/doctors'

//get doctors
app.get('/doctors', async(req, res)=>{
  try{
    const config = {
      headers : {
        Authorization: `${req.headers.authorization}`,
        'Content-Type': 'application/json'
      }
    }
    const response = await axios.get(`${DOCTORS_URL}?page=2&size=20`, config)
    res.status(200).json(response.data)
  } catch (error){
    console.error(error)
    res.status(500).json({message : 'Internal Server Error...'})
  }
})

//get a doctor by id
app.get('/doctors/:id', async(req, res)=>{
  const doctorId = req.params.id
  try{
    const config = {
      headers: {
        Authorization: `${req.headers.authorization}`,
        'Content-Type': 'application/json'
      }
    }
    const response = await axios.get(`${DOCTORS_URL}/${doctorId}`, config)
    res.status(200).json(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).json({message : 'Internal Server Error...'})
  }
})

//post a doctor 
app.post('/doctors', async(req,res)=>{
  try{
    const config = {
      headers : {
        Authorization: `${req.headers.authorization}`,
        'Content-Type': 'application/json'
      }
    }
    const response = await axios.post(`${DOCTORS_URL}`, req.body,config)
    res.status(201).json(response.data)
    console.log(response.status)
  } catch (error){
    console.error(error)
    res.status(500).json({message : 'Internal Server Error...'})
  }
})

//delete a doctor
app.delete('/doctors/:id', async(req, res)=>{
  const doctorId = req.params.id
  try{
    const config = {
      headers : {
        Authorization: `${req.headers.authorization}`,
        'Content-Type': 'application/json'
      }
    }
    const response = await axios.delete(`${DOCTORS_URL}/${doctorId}`, config)
    res.status(204).json({message: `Doctor Deleted Successfully\n${response}`})
  } catch(error){
    console.log(error)
    res.status(500).json({message: 'Internal Server Error'})
  }
})

//update a doctor
app.put('/doctors/:id', async(req, res) => {
  const doctorId = req.params.id
  try{
    const config = {
      headers: {
        Authorization: `${req.headers.authorization}`,
        'Content-Type': 'application/json'
      }
    }
    console.log(req.body)
    const response = await axios.put(`${DOCTORS_URL}/${doctorId}`, req.body, config)
    res.status(204).json(response.data)
  }catch (error) {
//    console.error(error)
    res.status(500).json({message: 'Internal server error...'})
  }
})

//get appointments for a patient
app.get('/doctors/:id/appointments', async(req, res)=>{
  const doctorId = req.params.id
  try{
    const config = {
      headers: {
        Authorization: `${req.headers.authorization}`,
        'Content-Type': 'application/json'
      }
    }
    console.log(config)
    const response = await axios.get(`${DOCTORS_URL}/${doctorId}/appointments`,config)
    res.status(200).json(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).json({message : 'Internal Server Error...'})
  }
})

//post appointment for doctor
app.post('/patients/:id/appointments', async(req,res)=>{
  const doctorId = req.params.id
  try{
    const config = {
      headers : {
        Authorization: `${req.headers.authorization}`,
        'Content-Type': 'application/json'
      }
    }
    const response = await axios.post(`${PATIENTS_URL}/${doctorId}/appointments`, req.body ,config)
    res.status(201).json(response.data)
    console.log(response.status)
  } catch (error){
    console.log(error)
    res.status(500).json({message : 'Internal Server Error...'})
  }
})
//post doctor availabilities : 
app.post('/doctors/:id/availabilities', async(req, res)=>{
  const doctorId = req.params.id
  try{
    const config = {
      headers: {
        Authorization: `${req.headers.authorization}`,
        'Content-Type': 'application/json'
      }
    }
    //console.log(req)
    const response = await axios.post(`${DOCTORS_URL}/${doctorId}/availabilities`, req.body,config)
    res.status(201).json(response.toString())
  } catch (error) {
    console.error(error)
    res.status(500).json({message : 'Internal Server Error...'})
  }
})

//getting Bills for a doctor
app.get('/doctors/:id/bills', async(req, res)=>{
  const doctorId = req.params.id
  try{
    const config = {
      headers: {
        Authorization: `${req.headers.authorization}`,
        'Content-Type': 'application/json'
      }
    }
    console.log(config)
    const response = await axios.get(`${DOCTORS_URL}/${doctorId}/bills`,config)
    res.status(200).json(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).json({message : 'Internal Server Error...'})
  }
})


//hosting port
const port = 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
