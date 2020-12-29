import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import useStyles from './stylesCheckout';
import { commerce } from '../../libs/commerce';
import AdressForm from './AdressForm';
import PaymentForm from './PaymentForm';
import { Link, useHistory } from 'react-router-dom';


const steps = ['Endereço de envio', 'Detalhes de pagamento'];

const Checkout = ({}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [shippingData, setShippingData] = useState({});
    const classes = useStyles();



    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const next = (data) => {
        setShippingData(data);
        nextStep();
    }
    const back = () => {
        backStep();
    }

    const Confirmation = () => (
        <>aa</>
    )

    const Form = () => activeStep == 0
        ? <AdressForm  next={next} />
        : <PaymentForm  next={next} back={back} shippingData={shippingData}/>
        

    return (
        <>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Finalizar Compra</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep == steps.length ? <Confirmation /> : <Form />}
                </Paper>
            </main>
        </>
    )
}
export default Checkout;