import React from "react";
import Menu from "./Header/Menu";
import Home from "./components/Home";
import Product from "./components/Product";
import ProductDetails from "./components/ProductDetails";
import Pnf from "./Util/Pnf";
import Cart from "./components/Cart";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App(){
return(
  <Router>
  <Menu/>
 <ToastContainer autoClose={2000} position={'top-right'}/>
  <Routes>
    <Route path={`/`} element={<Home itemsPerpage={4}/>}/>
    <Route path={`/Products/:catName`} element={<Product/>}/>
    <Route path={`/Product/:id/category/:catname`} element={<ProductDetails/>}/>
    <Route path={`/Cart`} element={<Cart/>}/>
    <Route path={`/*`} element={<Pnf/>}/>
  </Routes>
  </Router>
)
}
export default App