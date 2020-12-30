import React, { useState, useEffect, deps } from "react";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import Routes from "./Routes";
import Nav from "react-bootstrap/Nav";
import { LinkContainer, Link } from "react-router-bootstrap";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import { useHistory, useLocation } from "react-router-dom";
import { ShoppingCart } from '@material-ui/icons';
import {  IconButton, Badge} from '@material-ui/core';


import { commerce } from './libs/commerce';



function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const history = useHistory();
  const [cart, setCart] = useState({});
  const location = useLocation();


  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve())
  }

  useEffect(() => {
    onLoad();
    fetchCart();
  }, []);


  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    setIsAuthenticating(false);
  }

  
  async function handleLogout() {
    await Auth.signOut();

    userHasAuthenticated(false);

    history.push("/login");
  }


  return (
    !isAuthenticating && (
      <div className="App py-3">

        {/* Navbar */}
        <Navbar collapseOnSelect bg="dark" variant="dark" expand="md" className="mb-3 fixed-top">
          <LinkContainer to="/">
            <Navbar.Brand className="font-weight-bold text-muted">
              <h3>Minions Store</h3>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav activeKey={window.location.pathname}>
              {location.pathname=='/' && (
              <>
                <LinkContainer to="/cart">
                  <IconButton aria-label="Mostrar minions no carrinho" color="inherit">
                    <Badge badgeContent={cart.total_items} color="secondary">
                      
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
                </LinkContainer>
              </>
              )}
              {isAuthenticated ? (
                <>
                  <Nav.Link onClick={handleLogout}>Deslogar</Nav.Link>
                </>
              ) : (
                  <>

                    <LinkContainer to="/signup">
                      <Nav.Link>Inscrever-se</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/login">
                      <Nav.Link>Logar</Nav.Link>
                    </LinkContainer>
                  </>
                )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Routes />
        </AppContext.Provider>

        {/* Footer */}
        <div className="py-3">
          <footer class="py-5 bg-dark">
            <div class="container">
              <p class="m-0 text-center text-white">Copyright &copy; Minions Store - by Felippi Blanchard 2020</p>
            </div>
          </footer>
        </div>
      </div>
    )
  );
}

export default App;