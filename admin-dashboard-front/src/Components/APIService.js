import axios from "axios";
export default class APIService {
    //authenticate
    static Authenticate = async (body)=>{
        try{
            const response = await axios.post('/authenticate', body)
            return response
        }catch(error){
            console.log(error)
            return error
        }
    }

    //getting specialities
    static getSpecialities = async () => {
        try {
            const response = await axios.get(`/specialities`);
            return response
        } catch (error) {
            console.error(error);
            return error;
        }
    };

    //getting patients
    static GetPatients = async (token) =>{
        try{
            const response = await axios.get('/patients', {
                headers : {
                    Authorization : `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            return response
        } catch (error){
            console.log(error)
            return error
        }
    }

    //getting a patient by id
    static GetPatientsById = async (token, id) => {
        try{
            const response = await axios.get(`/patients/${id}`, {
                headers : {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            return response
        } catch (error){
            console.log(error)
            return error
        }
    }

    //posting a patient
    static PostPatient = async (token, body)=>{
        try{
            const response = await axios.post('/patients',body,{
                headers : {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json', 
                }
            })
            return response
        }catch(error){
            console.log(error)
            return error
        }
    }

    //deleting a patient
    static DeletePatient = async (token, id) =>{
        try{
            const response = await axios.delete(`/patients/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            return response
        } catch(error){
            console.log(error)
            return error
        }
    }

    //updating a patient by id
    static UpdatePatient = async (token, id, body) =>{
        try{
            const response = await axios.put(`/patients/${id}`, body,{
                headers : {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            return response
        }catch(error){
            console.log(error)
            return error
        }
    }

    //get all doctors
    static GetDoctors = async (token)=>{
        try{
            const response = await axios.get('/doctors', {
                headers : {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            return response
        }catch(error){
            console.log(error)
            return error
        }
    }

    //get a doctor by id
    static GetDoctorsById = async (token, id)=>{
        try{
            const response = await axios.get(`/doctors/${id}`, {
                headers : {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            return response
        } catch (error){
            console.log(error)
            return error
        }
    }

    //posting a doctor
    static PostDoctor = async (token, body)=>{
        try{
            const response = await axios.post('/doctors',body,{
                headers : {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json', 
                }
            })
            return response
        }catch(error){
            console.log(error)
            return error
        }
    }

    //deleting a doctor
    static DeleteDoctor = async (token, id) =>{
        try{
            const response = await axios.delete(`/doctors/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            return response
        } catch(error){
            console.log(error)
            return error
        }
    }
    
    //updating a doctor by id
    static UpdateDoctor = async (token, id, body) =>{
        try{
            const response = await axios.put(`/doctors/${id}`, body,{
                headers : {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            return response
        }catch(error){
            console.log(error)
            return error
        }
    }

    //get appointment for a patient: 
    static GetAppointment = async(token, id)=>{
        try{
            const response = await axios.get(`/doctors/${id}/appointments`, {
                headers : {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            return response
        }catch(error){
            return error
        }
    }

    //post appointment for a doctor:
    static PostAppointment = async (token, id, body)=>{
        try{
            const response = await axios.post(`/patients/${id}/appointments`, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            return response
        }catch(error){
            console.log(error)
            return error
        }
    }

    //post doctor availabilities
    static PostAvailability = async (token, id, body)=>{
        try{
            const response = await axios.post(`/doctors/${id}/availabilities`, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            return response
        }catch(error){
            console.log(error)
            return error
        }
    }

    //get doctor bills
    static GetBills = async(token, id)=>{
        try{
            const response = await axios.get(`/doctors/${id}/bills`, {
                headers : {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            return response
        }catch(error){
            return error
        }
    }
}
