import config from 'config';

const REQUEST = 'LIST_PRODUCTS_REQUEST';
const RESPONSE = 'LIST_PRODUCTS_RESPONSE';
const ERROR = 'LIST_PRODUCTS_ERROR';

const initialState = {
    items: [],
    loading: false,
    hasLoaded: false,
    error: null
};

// Reducer
export default function reducer(state = initialState, action = {}) {
    console.info('action', action);
    switch (action.type) {
        case REQUEST:
            return {
                ...state,
                items: [],
                loading: true,
                hasLoaded: false,
                error: null
            };
        case RESPONSE:
            return {
                ...state,
                items: action.payload?.items ?? [],
                loading: false,
                hasLoaded: true,
                error: null
            };
        case ERROR:
            return {
                ...state,
                items: [],
                loading: false,
                hasLoaded: true,
                error: action.payload?.error
            };
        default:
            return state;
    }
};

// Action Creators
export const getProducts = () => dispatch => {
    dispatch({
        type: REQUEST
    });
    
    fetch(`${config.apiBaseUrl}products?token=${config.apiToken}`, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(response => {
            dispatch({
                type: RESPONSE,
                payload: {
                    items: response ?? []
                }
            });
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