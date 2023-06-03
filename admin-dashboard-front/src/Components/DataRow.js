import  React ,{useState}  from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import UpdatePatient from './UpdatePat';
import UpdateDoctor from './UpdateDoc';
import DeleteDoctor from './DeleteDoc';
import DeletePatient from './DeletePat';

export default function OneRow(props) {
  const data = props.item;
  const [PatientTrigger, setPatientTrigger] = useState(false)
  const [DoctorTrigger, setDoctorTrigger] = useState(false)
  const [PatientDelTrigger, setPatientDelTrigger] = useState(false)
  const [DoctorDelTrigger, setDoctorDelTrigger] = useState(false)
  
  if (!data || Object.keys(data).length === 0) {
    return "";
  }

  const keys = Object.keys(data);

  const handleDelete = () => {
    if(props.status === 'patient'){
      setPatientDelTrigger(true)
      setDoctorDelTrigger(false)
    }
    else if (props.status === 'doctor'){
      setPatientDelTrigger(false)
      setDoctorDelTrigger(true)
    }
  };

  const handleUpdate = () => {
    if(props.status === 'patient'){
      setPatientTrigger(true)
      setDoctorTrigger(false)
    }
    else if (props.status === 'doctor'){
      setPatientTrigger(false)
      setDoctorTrigger(true)
    }
  };
  const id = data.id
  return (
    <>
      <TableContainer component={Paper} sx={{marginTop: 3,minWidth: 1150 ,maxWidth: 1350, alignSelf: 'center'}}>
        <Table sx={{minWidth: 650}} aria-label="caption table">
          <TableBody>
            <TableRow>
              {keys.map((key) => (
                <TableCell align="center" key={key}>{key}</TableCell>
              ))}
            </TableRow>
            <TableRow>
            {keys.map((key) => (
                <TableCell align="center" key={key}>{data[key]}</TableCell>
              ))}
              <TableCell align="right">
                <Stack spacing={1} direction="row">
                  <Button variant="outlined" onClick={handleDelete} style={{backgroundColor: 'rgba(248, 58, 58, 0.30)', alignSelf: 'right'}}>Delete</Button>
                  <Button variant="outlined" onClick={handleUpdate} style={{backgroundColor: 'rgba(7, 207, 7, 0.30)', alignSelf: 'right'}}>Update</Button>
                </Stack>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      { PatientTrigger && <UpdatePatient Trigger={PatientTrigger} setTrigger={setPatientTrigger} id={id} />}
      { DoctorTrigger && <UpdateDoctor Trigger={DoctorTrigger} setTrigger={setDoctorTrigger} id={id} />}
      { PatientDelTrigger && <DeletePatient Trigger={PatientDelTrigger} setTrigger={setPatientDelTrigger} id={id} />}
      { DoctorDelTrigger && <DeleteDoctor Trigger={DoctorDelTrigger} setTrigger={setDoctorDelTrigger} id={id} />}
    </>
  );
}