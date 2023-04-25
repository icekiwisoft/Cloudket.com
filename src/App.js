import logo from './logo.svg';
import './App.scss';
import Server from './pages/server';
import Login from './pages/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (

    <BrowserRouter >
    <Routes>
    <Route path='/' element={<Server/>}/>
    <Route path='/:id' element={<Server/>}/>
    <Route path='/:id/:folderid' element={<Server/>}/>


    <Route path='login' element={<Login/>}/>

    
    </Routes>

    </BrowserRouter>

  );
}

export default App;
