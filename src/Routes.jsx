import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Header from 'components/Header';
import Products from 'pages/Products';
import Cart from 'pages/Cart';

const Routes = () => {
    return (
        <Router>
            <Header />

            <Switch>
                <Route path="/cart">
                    <Cart />
                </Route>
                <Route path="/">
                    <Products />
                </Route>
            </Switch>
        </Router>
    );
};

export default Routes;