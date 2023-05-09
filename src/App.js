
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Registration from './pages/Registration/Registration';
import Login from './pages/Login/Login';
import ProtectedRouteComponent from './components/ProtectedRouteComponent';
import { createContext, useState } from 'react';
import {LOCAL_DATA}  from './utils/constants'

export const DataContext = createContext()

function App() {
   const [contextLocaldata,setContextLocalData] = useState( LOCAL_DATA )    

  return (
    <DataContext.Provider value={[contextLocaldata, setContextLocalData]}>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<ProtectedRouteComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
    </DataContext.Provider>
  );
}

export default App;
