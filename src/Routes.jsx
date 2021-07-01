import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Header from 'components/Header';
import ProductList from 'components/ProductList';
import Cart from 'components/Cart';

const Routes = () => {
    return (
        <Router>
            <Header />

            <Switch>
                <Route path="/cart">
                    <Cart />
                </Route>
                <Route path="/">
                    <ProductList />
                </Route>
            </Switch>
        </Router>
    );
};

export default Routes;