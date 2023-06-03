import './App.css';
import AdminPanel from './Components/AdminPanel';
import Login from './Components/Login';
import Nav from './Components/Nav';
import { Route, Routes } from 'react-router';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import Footer from './Components/Footer';
library.add(fas, fab)
function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/AdminDashboard' element={<AdminPanel/>}/>
      </Routes>
      
      <Footer/>
    </div>
  );
}

export default App;
