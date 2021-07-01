import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import config from '../../../config';

export const useProducts = refresher => {
    const [fetchState, setFetchState] = useState({
        loading: false,
        errors: '',
        complete: false
    });
    const [data, setData] = useState([]);

    useEffect(() => {
        const controller = new AbortController();

        setFetchState(state => ({
            ...state,
            loading: true,
            errors: '',
            complete: false
        }));

        fetch(`${config.apiBaseUrl}products?token=${config.apiToken}`, {
            method: 'GET',
            // headers: {
            //     Authorization: `Bearer ${token}`
            // },
            signal: controller.signal
        })
            .then(response => response.json())
            .then(result => {
                setData(result?.products ?? []);
                setFetchState(state => ({
                    ...state,
                    loading: false,
                    errors: result?.Error,
                    complete: true
                }));
            })
            .catch(error => {
                setFetchState(state => ({
                    ...state,
                    loading: false,
                    errors: error.toString(),
                    complete: error?.name !== 'AbortError'
                }));
            });

        return () => {
            if (controller) {
                controller.abort();
            }
        };
    }, [setFetchState, setData, refresher]);

    return {
        data,
        loading: fetchState.loading,
        errors: fetchState.errors,
        complete: fetchState.complete
    };
};
