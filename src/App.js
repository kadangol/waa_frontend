import logo from './logo.svg';
import './App.css';
import bootstrap from 'bootstrap';
import Header from './components/header'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/login';
import Home from './components/home';
import Checkout from './components/checkout';
import Footer from './components/footer'


function App() {
  return (
    <Router>
      <div className="main-container">
         <Header />
        <Routes>
         
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
 
 
}

export default App;
