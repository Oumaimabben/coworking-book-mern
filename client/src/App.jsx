import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import CreateReservationForm from './pages/Createrev';
import About from './pages/About';
import ReservationForm from './pages/ReservationForm';

export default function App() {
  return <BrowserRouter>
  <Header/>
  <Routes>
    <Route path='/' element={< Home/>}/>
    <Route path='/login' element={< Login/>}/>
    <Route path='/register' element={< Register/>}/>
    <Route path='/about' element={< About/>}/>
        <Route path='/reservation' element={< ReservationForm/>}/>


   
          <Route path='/createrev' element={<CreateReservationForm/>} />
  
  </Routes>
  </BrowserRouter>
}