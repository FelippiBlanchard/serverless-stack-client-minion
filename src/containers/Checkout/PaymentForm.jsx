import React, { useState, useEffect } from "react";

import { Link } from 'react-router-dom';

import { commerce } from '../../libs/commerce';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';


const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #32364e 30%, #6c6a42 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 170,
        padding: '10px 30px',
    },
});


const PaymentForm = ({ next, back, shippingData }) => {
    const [cart, setCart] = useState({});
    const classes = useStyles();
    const methods = useForm();

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve())
    };

    useEffect(() => {
        fetchCart();
    }, []);

    if (!cart.line_items) return 'Carregando ... ';
    if (!shippingData) return 'Carregando ... ';
    console.log({ shippingData });

    return (
        <>
            <h4>Itens:
                {cart.line_items.map((item) => (
                <Grid>
                    {item.line_total.formatted_with_symbol} = {item.name} x {item.quantity}
                </Grid>
            ))}</h4>
            <h2>Total: {cart.subtotal.formatted_with_symbol}</h2><br />
            <h2> confirme os dados: </h2>
            <div className={classes.root}>
                <h5>Nome: {shippingData.data.Nome}<br />
                Email: {shippingData.data.Email}<br />
                Telefone: {shippingData.data.Telefone}<br />
                Cidade: {shippingData.data.Cidade}<br />
                Endereço: {shippingData.data.Endereço}<br />
                CEP: {shippingData.data.CEP}
                    <br />
                </h5>
            </div>
            <Typography variant="h6" gutterBottom></Typography>
            <FormProvider {...methods}>
                <br />
                <Button onClick={() => back()} variant="contained"  >Consertar</Button>
                <form onSubmit={methods.handleSubmit((shippingData) => next({ shippingData }))}>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={Link} to="/cart" variant="outlined">Voltar para o Carrinho</Button>
                        <Button component={Link} to="/" variant="contained">Cancelar</Button>
                        <Button type="submit" variant="contained" color="primary" >Confirmar Pedido</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )

};

export default PaymentForm;
