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
import Checkout from './Checkout/Checkout'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function HomeCart() {
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

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });

    setCart(cart);
  }

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);

    setCart(cart);
  }

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();

    setCart(cart);
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);


  return (
    <div className="HomeCart">
      <div className="py-3">
          <Route exact path="/cart">
            <Cart cart={cart}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart} />
          </Route>
      </div>
    </div>
  );
}