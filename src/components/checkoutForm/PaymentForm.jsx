import React from 'react'
import { Typography, Button, Divider } from "@material-ui/core";

import Review from "./Review";

function PaymentForm({ checkoutToken }) {
	return (
		<>
			<Review checkoutToken={ checkoutToken }/>
		</>	
	)
}

export default PaymentForm
