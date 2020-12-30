
import React from "react";
import emailjs from 'emailjs-com';
import { Link } from 'react-router-dom';
import handleEmptyCart from '../HomeCart';
import { Button } from '@material-ui/core';

const Confirmation = ({ shippingData }) => {

    var e = {
        to_name: shippingData.data.Nome,
        to_email: shippingData.data.Email,
        message: ''
    };

    function sendEmail(e) {
        emailjs.send('service_6zl6gfm', 'template_pov0kfi', e, 'user_5IqTA0mCNkmNTeS31xAds')
            .then((result) => {
                console.log('Enviado com sucesso', result.status);
            }, (error) => {
                console.log('error', error.text);
            });
        return (
            null
        )
    }

    if (!shippingData) return 'Carregando ... ';
    return (
        <>
            Compra Efetivada
            {sendEmail(e)}
            {handleEmptyCart}

            <div style={{ display: 'flex' }}>
                <Button component={Link} to="/" variant="contained" color="primary">Voltar ao inicio</Button>
            </div>
        </>
    )
}

export default Confirmation;
