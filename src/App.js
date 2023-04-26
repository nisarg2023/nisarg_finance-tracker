
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddTransaction from './pages/AddTransaction/AddTransaction';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AddTransaction/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
