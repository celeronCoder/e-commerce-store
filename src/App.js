import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart, Checkout } from "./components";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});

    async function fetchProducts() {
        const { data } = await commerce.products.list();
        setProducts(data);
    }

    async function fetchCart() {
        setCart(await commerce.cart.retrieve());
    }

    async function handleAddToCart(productId, quantity) {
        const { cart } = await commerce.cart.add(productId, quantity);

        setCart(cart);
    }

	async function handleUpdateCartQty(productId, quantity) {
		const { cart } = await commerce.cart.update(productId, { quantity });

		setCart(cart);
	}

	async function handleRemoveFromCart(productId) {
		const { cart } = await commerce.cart.remove(productId);

		setCart(cart);
	}

	async function handleEmptyCart() {
		const { cart } = await commerce.cart.empty();

		setCart(cart);
	}


    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, [])

    return (
		<Router>
			<div>
				<Navbar totalItems={ cart.total_items } />
				<Switch>
					<Route exact path="/">
						<Products products={products} onAddToCart={handleAddToCart} />
					</Route>
					<Route exact path="/cart">
						<Cart 
							cart={ cart }
							handleUpdateCartQty={handleUpdateCartQty}
							handleRemoveFromCart={handleRemoveFromCart}
							handleEmptyCart={handleEmptyCart}
						/>
					</Route>
					<Route exact path="/checkout">
						<Checkout cart={cart} />
					</Route>
				</Switch>
			</div>
		</Router>
    )
}

export default App;
