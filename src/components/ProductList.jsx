import React from 'react';
import { formatCurrencyAud } from 'util/currency';

import styles from './ProductList.module.css';

const ProductList = ({ products, onAddToCart = () => {} }) => {
    return (
        <ul className={styles.productList} aria-label="products">
            {products?.map(product => 
                <li className={styles.product} key={`product-${product?.productId}`}>
                    <div className={styles.details}>
                        <strong>{product?.name}</strong>
                        <p>{product?.description}</p>
                    </div>
                    <div className={styles.pricing}>
                        <span className={styles.price}>{formatCurrencyAud(product?.audPrice)}</span>
                        {!product?.stockOnHand ? <span className={styles.outOfStock}>Out of Stock</span> :
                        <button className="btn btn-primary" onClick={() => onAddToCart(product)}>
                            Add to Cart
                        </button>}
                    </div>
                </li>
            )}
        </ul>
    );
};

export default ProductList;