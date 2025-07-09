import Login from './component/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './component/Register';
 import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './component/Dashboard';


function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
  );
}

export default App;
