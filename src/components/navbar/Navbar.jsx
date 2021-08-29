import React from "react";

import { AppBar, Badge, IconButton, Toolbar, Typography } from "@material-ui/core";

import logo from "../../assets/logo.png";

import {ShoppingCart} from "@material-ui/icons";

import useStyles from "./styles";

const Navbar = () => {
    const classes = useStyles();
    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Kharido" height="50px" className={classes.image} />
                        Kharido
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.button}>
                        <IconButton aria-label="Show cart items" color="inherit">
                            <Badge badgeContent={2} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar;
