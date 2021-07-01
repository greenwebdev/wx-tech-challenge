import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import CartItems from 'components/CartItems';
import { formatCurrencyAud } from 'util/currency';
import { Link } from 'react-router-dom';
import { checkout } from 'modules/cart';

import styles from './Cart.module.css';

const Cart = () => {
    const dispatch = useDispatch();
    const cartTotal = useSelector(state => state.cart?.totalAmount ?? 0);
    const cartItems = useSelector(state => state.cart?.items ?? []);
    const isCheckingOut = useSelector(state => state.cart?.loading ?? false);
    const hasCheckedOut = useSelector(state => state.cart?.hasCheckedOut ?? false);
    const checkoutError = useSelector(state => state.cart?.error ?? null);

    const handleCheckout = () => {
        dispatch(checkout(cartItems));
    };

    return (
        <div className={styles.wrap}>
            <div className="container">
                <h1>Your Cart</h1>
                {cartItems?.length > 0 &&
                    <>
                        <CartItems cartItems={cartItems} />
                        <div className={styles.cartFooter}>
                            <div className={styles.cartTotal}>
                                <strong>Total:</strong>
                                <span>{formatCurrencyAud(cartTotal)}</span>
                            </div>
                            <button className={classNames('btn btn-primary', styles.btnCheckout)} onClick={handleCheckout} disabled={isCheckingOut}>
                                Checkout
                            </button>
                        </div>
                    </>
                }
                {hasCheckedOut && <p className="alert alert-success" role="alert">Your order has been successfully submitted. Thanks for shopping with us!</p>}
                {checkoutError && <p className="alert alert-danger" role="alert">{checkoutError}</p>}
                {(!hasCheckedOut && cartItems?.length === 0) && <p>Your cart is empty. Browse our <Link to="/">products</Link> to add something.</p>}
            </div>
        </div>
    );
};

export default Cart;