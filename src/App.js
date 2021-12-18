import logo from "./logo.svg";
import "./App.css";
import bootstrap from "bootstrap";
import Header from "./components/header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import Checkout from "./components/checkout";
import Footer from "./components/footer";
import Register from "./components/register";
import NavLinks from "./components/navLinks";
import Sellers from "./components/sellers";
import SellerProduct from "./components/sellerProduct";
import Unapproved from "./components/unapproved";
import AddProduct from "./components/addProduct";

function App() {
  return (
    <Router>
      <div className="main-container">
        <Header />
        <NavLinks />
        <Routes>
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/approve-sellers" element={<Sellers />} />
          <Route exact path="/product" element={<SellerProduct />} />
          <Route exact path="/unapproved" element={<Unapproved />} />
          <Route exact path="/add-product" element={<AddProduct />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
