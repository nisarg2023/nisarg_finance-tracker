
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Registration from './pages/Registration/Registration';
import Login from './pages/Login/Login';
import ProtectedRouteComponent from './components/ProtectedRouteComponent';
import { createContext, useState } from 'react';
import { LOCAL_DATA, USERS_DATA } from './utils/constants'
import { Provider } from 'react-redux';
import store from './store';

export const DataContext = createContext();
export const UserContext = createContext();
export const CheckUserLoginContext = createContext();


function App() {
  const [contextLocaldata, setContextLocalData] = useState(LOCAL_DATA);
  const [contextUser, setContextUser] = useState(USERS_DATA);
  const [isUserLogin, setIsUserLogin] = useState(false);    
  
  return (
    <Provider store={store}>
    <CheckUserLoginContext.Provider value={[isUserLogin, setIsUserLogin]}>
      <UserContext.Provider value={[contextUser, setContextUser]}>
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
      </UserContext.Provider>
    </CheckUserLoginContext.Provider>
    </Provider>
  );
}

export default App;
