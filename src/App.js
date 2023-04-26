
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddTransaction from './pages/AddTransaction/AddTransaction';
import AllTransactions from './pages/AllTransactions/AllTransactions';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AddTransaction/>}/>
          <Route path="/alltransactions" element={<AllTransactions/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
