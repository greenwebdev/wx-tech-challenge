import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatCurrencyAud } from 'util/currency';

import styles from './Header.module.css';

const Header = () => {
    const cartTotal = useSelector(state => state.cart?.totalAmount ?? 0);

    return (
        <header className={styles.wrap} role="banner">
            <div className="container">
                <div className={styles.navLayout}>
                    <nav className={styles.nav}>
                        <ul className={styles.navItems}>
                            <li>
                                <Link to="/products">Products</Link>
                            </li>
                            <li>
                                <Link to="/cart">Cart</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className={styles.cartSummary}>
                        <Link to="/cart">
                            <span className={styles.label}>Cart total</span>
                            <span className={styles.total}>{formatCurrencyAud(cartTotal)}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;