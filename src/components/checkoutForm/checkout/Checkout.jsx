import { Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react';

import useStyles from "./styles";

import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

import { commerce } from "../../../lib/commerce";

const steps = [
	'Shipping Address',
	'Payment Details'
]

function Checkout({ cart }) {
	const classes = useStyles();
	const [activeStep, setActiveStep] = useState(0);
	const [shippingData, setshippingData] = useState({})

	const [checkoutToken, setcheckoutToken] = useState(null);

	useEffect(() => {
		async function genToken() {
			try {
				const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });

				setcheckoutToken(token)
			} catch (error) {

			}
		}
		genToken();
	}, [cart]);

	function nextStep() {
		setActiveStep(prevActiveStep => prevActiveStep+1);
	}

	function backStep() {
		setActiveStep(prevActiveStep => prevActiveStep-1);
	}

	function next(data) {
		setshippingData(data);
		console.log(data);

		nextStep();
	}

	function Form() { return (
		activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} next={next} /> : <PaymentForm />
	)}

	function Confirmation() { return (
		<div>
			Confirmation
		</div>
	)}

	return (
		<>
			<div className={classes.toolbar} />
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Typography variant="h4" align="center">Checkout</Typography>
					<Stepper activeStep={activeStep} className={classes.stepper}>
						{
							steps.map((step) => (
								<Step key={step}>
									<StepLabel>{step}</StepLabel>
								</Step>
							))
						}
					</Stepper>
					{
						activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />
					}
				</Paper>
			</main>

		</>
	)
}

export default Checkout
