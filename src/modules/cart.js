import config from 'config';

const ADD_TO_CART = 'ADD_TO_CART';
const REQUEST = 'CHECKOUT_REQUEST';
const RESPONSE = 'CHECKOUT_RESPONSE';
const ERROR = 'CHECKOUT_ERROR';

const initialState = {
    items: [],
    totalAmount: 0,
    loading: false,
    hasCheckedOut: false,
    error: null
};

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case ADD_TO_CART:
            const { product, qty } = action?.payload;

            let newState = {
                ...state,
                // Reset the flag tracking if we have checked out if the cart was empty
                hasCheckedOut: state.items.length > 0 ? state.hasCheckedOut : false
            };

            const existingItemIndex = state.items.findIndex(item => item.productId === product?.productId);

            // Increment the existing quantity if this item is already in the cart
            if (existingItemIndex !== -1) {
                newState.items[existingItemIndex].qty += qty;
            } else {
                newState.items = [
                    ...newState.items,
                    {
                        productId: product?.productId,
                        name: product?.name,
                        price: product?.audPrice,
                        qty
                    }
                ];
            }

            let totalAmount = 0;

            for (let i = 0; i < newState.items.length; i++) {
                totalAmount += newState.items[i].price * newState.items[i].qty;
            }

            newState.totalAmount = totalAmount;

            return newState;
        case REQUEST:
            return {
                ...state,
                loading: true,
                hasCheckedOut: false,
                error: null
            };
        case RESPONSE:
            return {
                ...state,
                items: [],
                totalAmount: 0,
                loading: false,
                hasCheckedOut: true,
                error: null
            };
        case ERROR:
            return {
                ...state,
                loading: false,
                hasCheckedOut: false,
                // This would ideally be a server error if the API returned one
                error: `Oops, something went wrong and we couldn't process your order. Please try again later.`
            };
        default:
            return state;
    }
};

// Action Creators
export const addToCart = (product, qty = 1) => dispatch => {
    dispatch({
        type: ADD_TO_CART,
        payload: {
            product,
            qty
        }
    });
};

export const checkout = cart => dispatch => {
    dispatch({
        type: REQUEST
    });

    fetch(`${config.apiBaseUrl}checkout?token=${config.apiToken}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(cart)
    })
        .then(response => {
            if (response?.ok) {
                dispatch({
                    type: RESPONSE
                });
            } else {
                dispatch({
                    type: ERROR
                })
            }
        })
        .catch(error => {
            dispatch({
                type: ERROR,
                payload: {
                    error
                }
            });
        });
};