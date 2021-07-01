import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from 'modules/products';
import { addToCart } from 'modules/cart';
import { formatCurrencyAud } from 'util/currency';

import styles from './ProductList.module.css';

const ProductList = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.products?.loading ?? false);
    const products = useSelector(state => state.products?.items ?? []);

    const handleClickAddToCart = product => {
        dispatch(addToCart(product));
    };

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <div className={styles.wrap}>
            <div className="container">
                <h1>Products</h1>
                {isLoading ? 
                    <div>Loading...</div>
                :
                <ul className={styles.productList}>
                    {products?.map(product => 
                        <li className={styles.product} key={`product-${product?.productId}`}>
                            <div className={styles.details}>
                                <strong>{product?.name}</strong>
                                <p>{product?.description}</p>
                            </div>
                            <div className={styles.pricing}>
                                <span className={styles.price}>{formatCurrencyAud(product?.audPrice)}</span>
                                {!product?.stockOnHand ? <span className={styles.outOfStock}>Out of Stock</span> :
                                <button className="btn btn-primary" onClick={() => handleClickAddToCart(product)}>
                                    Add to Cart
                                </button>}
                            </div>
                        </li>
                    )}
                </ul>
                }
            </div>
        </div>
    );
};

export default ProductList;