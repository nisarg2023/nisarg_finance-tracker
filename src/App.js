
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Registration from './pages/Registration/Registration';
import Login from './pages/Login/Login';
import ProtectedRouteComponent from './components/ProtectedRouteComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<ProtectedRouteComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
