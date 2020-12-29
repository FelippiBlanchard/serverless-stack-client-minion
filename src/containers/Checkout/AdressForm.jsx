
import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { commerce } from '../../libs/commerce';
import FormInput from './CustomTextField';


const AdressForm = ({ checkoutToken, next }) => {
    const methods = useForm();
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }));

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

        console.log(countries);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries));
    };

    useEffect(() => {
        
    }, []);


    return (
        <>
            <Typography variant="h6" gutterBottom>Endereço de Envio</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => next({ data }))}>
                    <Grid container spacing={3}>
                        <FormInput required name='Nome' label='Nome' />
                        <FormInput required name='Email' label='Email' />
                        <FormInput required name='Cidade' label='Cidade' />
                        <FormInput required name='Endereço' label='Endereço' />
                        <FormInput required name='CEP' label='CEP' />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>País de Envio</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {countries.map((country) => (
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.label}
                                    </MenuItem>
                                ))}
                            </Select>

                        </Grid>
                    </Grid>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={Link} to="/cart" variant="outlined">Voltar para o Carrinho</Button>
                        <Button type="submit" variant="contained" color="primary" >Próximo</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AdressForm;