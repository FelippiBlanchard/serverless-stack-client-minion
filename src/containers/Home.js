import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";
import { API } from "aws-amplify";
import { commerce } from '../libs/commerce';
import Products from './Products/Products';
import Navbar from './Navbar';
import Cart from './Cart/Cart';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function Home() {
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve())
  }

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  }
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);


  return (

    <div className="Home">
      <div className="py-3">
        <Products products={products} onAddToCart={handleAddToCart} />
      </div>
    </div>
  );
}