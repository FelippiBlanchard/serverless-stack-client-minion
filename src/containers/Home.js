import React, { useState, useEffect } from "react";
import "./Home.css";
import { commerce } from '../libs/commerce';
import Products from './Products/Products';
import { Button } from '@material-ui/core';

import { Link } from 'react-router-dom';


export default function Home() {

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
        <div class="d-flex justify-content-center">
          <Button component={Link} to="/cart" variant="contained" color="primary">ir ao Carrinho</Button>
        </div>
      </div>
    </div>
  );
}