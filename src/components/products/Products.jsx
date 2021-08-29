import {Grid} from "@material-ui/core";
import React from "react";

import Product from "./product/Product";

import useStyles from "./styles";

const products = [
    { id: 1, name: 'Shoes', description: 'Running Shoes', price: "$5", image: "https://cdn.shopclues.com/images1/thumbnails/105192/320/320/149110017-105192149-1588784160.jpg"},
    { id: 2, name: 'Laptop', description: 'Dell Inspiron 5501', price: "$700", image: "https://m.media-amazon.com/images/I/61v9cn29+fL._SX679_.jpg"}
]

const Products = () => {
    const classes = useStyles();
    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justifyContent="center" spacing={4}>
                {/* eslint-disable-next-line */}
                {products.map((product) => {
                    return (
                        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                            <Product product={product} />
                        </Grid>
                    )
                })}  
            </Grid>
        </main>
    )
}
export default Products;
