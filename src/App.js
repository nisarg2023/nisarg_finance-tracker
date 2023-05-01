
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddTransaction from './pages/AddTransaction/AddTransaction';
import AllTransactions from './pages/AllTransactions/AllTransactions';
import ViewTransaction from './pages/ViewTransaction/ViewTransaction';
import UpdateTransaction from './pages/UpdateTransaction/UpdateTransaction';
import Registration from './pages/Registration/Registration';
import Login from './pages/Login/Login';
import Auth from './services/Auth';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Auth><AddTransaction /></Auth>} />
          <Route path="/alltransactions" element={<Auth><AllTransactions /></Auth>} />
          <Route path="/view/:id" element={<Auth><ViewTransaction /></Auth>} />
          <Route path="/update/:id" element={<Auth><UpdateTransaction /></Auth>} />



          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
