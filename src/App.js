import './App.css';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../src/component/pages/Home/Home';
import UserDetail from './component/pages/UserDetail/UserDetail';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/user/:login' element={<UserDetail/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
