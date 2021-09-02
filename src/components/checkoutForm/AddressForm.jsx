import { Button, Grid, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { commerce } from "../../lib/commerce";

import FormInput from './CustomTextField';

function AddressForm({ checkoutToken, next }) {
	const methods = useForm();

	const [shippingCountries, setshippingCountries] = useState([]);
	const [shippingCountry, setshippingCountry] = useState('');
	const [shippingSubdivisions, setshippingSubdivisions] = useState([]);
	const [shippingSubDivision, setshippingSubDivision] = useState('');
	const [shippingOptions, setshippingOptions] = useState([]);
	const [shippingOption, setshippingOption] = useState('');

	async function fetchShippingCountries(checkoutTokenId) {
		const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
		setshippingCountries(countries);
		setshippingCountry(Object.keys(countries)[0]);
	}

	const countries = Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name}));

	async function fetchSubDivsions(countryCode) {
		const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

		setshippingSubdivisions(subdivisions);
		setshippingSubDivision(Object.keys(subdivisions)[0]);
	}

	const subDivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({id: code, label: name}));

	async function fetchShippingOptions(checkoutTokenId, country, region = null) {
		const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });

		setshippingOptions(options);
		setshippingOption(options[0].id);
	}

	const options = shippingOptions.map((sO) => ({id: sO.id, label: `${sO.description} - ${sO.price.formatted_with_symbol}`}));

	useEffect(() => {
		fetchShippingCountries(checkoutToken.id);

	}, []);

	useEffect(() => {
		if (shippingCountry) fetchSubDivsions(shippingCountry);
	}, [shippingCountry]);

	useEffect(() => {
		if (shippingSubDivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubDivision);
	}, [shippingSubDivision])

	return (
		<>
			<Typography variant="h6" gutterBottom>Shopping Address</Typography>
			<FormProvider { ...methods }>
				<form onSubmit={methods.handleSubmit(data => next({ ...data, shippingCountry, shippingSubDivision, shippingOption }))}>
					<Grid container spacing={3}>
						<FormInput name='firstName' label="First Name" />				
						<FormInput name='lastName' label="Last Name" />				
						<FormInput name='address1' label="Address" />				
						<FormInput name='email' label="Email" />				
						<FormInput name='City' label="City" />				
						<FormInput name='zip' label="ZIP / Postal Code" />

						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Country</InputLabel>
							<Select value={shippingCountry} fullWidth onChange={(e) => setshippingCountry(e.target.value)}>
								{countries.map((country) => (
									<MenuItem key={country.id} value={country.id}>
										{country.label}
									</MenuItem>
								))}
							</Select>
						</Grid>

						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Subdivision</InputLabel>
							<Select value={shippingSubDivision} fullWidth onChange={(e) => setshippingSubDivision(e.target.value)}>
								{subDivisions.map((subdivision) => (
									<MenuItem key={subdivision.id} value={subdivision.id}>
										{ subdivision.label }
									</MenuItem>
								))}
							</Select>
						</Grid>

						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Options</InputLabel>
							<Select value={shippingOption} fullWidth onChange={(e) => setshippingOption(e.target.value)}>
								{options.map(option => (
									<MenuItem key={option.id} value={option.id}>
										{ option.label }
									</MenuItem>
								))}
							</Select>
						</Grid>		
					</Grid>
				</form>
				<br />
				<div style={{ display: 'felx', justifyContent: 'space-between'}}>
					<Button component={Link} to="/cart" variant="outlined">Go Back</Button>
					<Button variant="contained" type="submit" color="primary">Next</Button>
				</div>
			</FormProvider>
		</>
	)
}

export default AddressForm
