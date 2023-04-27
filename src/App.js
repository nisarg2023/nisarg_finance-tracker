
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddTransaction from './pages/AddTransaction/AddTransaction';
import AllTransactions from './pages/AllTransactions/AllTransactions';
import ViewTransaction from './pages/ViewTransaction/ViewTransaction';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AddTransaction/>}/>
          <Route path="/alltransactions" element={<AllTransactions/>}/>
          <Route path="/view/:id" element={<ViewTransaction/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
