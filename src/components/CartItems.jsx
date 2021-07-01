import React from 'react';
import { formatCurrencyAud } from 'util/currency';

import styles from './CartItems.module.css';

const CartItems = ({ cartItems }) => {
    return (
        <ul className={styles.cartItemList}>
            {cartItems?.map(cartItem =>
                <li className={styles.cartItem} key={`cartItem-${cartItem?.productId}`}>
                    <div className={styles.name}>{cartItem?.name}</div>
                    <span className={styles.price}>{formatCurrencyAud(cartItem?.price)}ea</span>
                    <div className={styles.qty}>x{cartItem?.qty}</div>
                    <span className={styles.linePrice}>{formatCurrencyAud(cartItem?.price * cartItem?.qty)}</span>
                </li>
            )}
        </ul>
    );
};

export default CartItems;


