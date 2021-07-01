import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductList from 'components/ProductList';
import { getProducts } from 'modules/products';
import { addToCart } from 'modules/cart';

const Products = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.products?.loading ?? false);
    const products = useSelector(state => state.products?.items ?? []);

    const handleAddToCart = product => {
        dispatch(addToCart(product));
    };

    // Refresh products every time we hit this page
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <div>
            <div className="container">
                <h1>Products</h1>
                {isLoading ? 
                    <div>Loading...</div>
                :
                    <ProductList products={products} onAddToCart={handleAddToCart} />
                }
            </div>
        </div>
    );
};

export default Products;