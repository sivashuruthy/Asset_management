import Login from './component/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './component/Register';
 import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './component/Dashboard';
import Add_asset from './component/Add_asset';


function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Add_asset" element={<Add_asset />} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
