import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

export default function App() {
  return <BrowserRouter>
  <Header/>
  <Routes>
    <Route path='/' element={< Home/>}/>
    <Route path='/login' element={< Login/>}/>
    <Route path='/register' element={< Register/>}/>
  </Routes>
  </BrowserRouter>
}