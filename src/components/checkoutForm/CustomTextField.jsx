import { Grid, TextField } from '@material-ui/core'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

function FormInput({ name, label }) {
	const { control } = useFormContext();

	return (
		<Grid item xs={12} sm={6}>
			<Controller
				control={ control }
				render={({ field }) => <TextField {...field} fullWidth name={ name } label={ label } required />}
			/>
		</Grid>
	)
}

export default FormInput;
