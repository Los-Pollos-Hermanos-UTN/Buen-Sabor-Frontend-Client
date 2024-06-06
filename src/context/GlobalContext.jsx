// src/context/GlobalContext.jsx

import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
    cart: [],
    user: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const item = state.cart.find(cartItem => cartItem.id === action.payload.id);
            if (item) {
                return {
                    ...state,
                    cart: state.cart.map(cartItem =>
                        cartItem.id === action.payload.id
                            ? { ...cartItem, quantity: cartItem.quantity + 1 }
                            : cartItem
                    ),
                };
            }
            return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: state.cart.filter(cartItem => cartItem.id !== action.payload.id),
            };
        case 'UPDATE_CART_QUANTITY':
            return {
                ...state,
                cart: state.cart.map(cartItem =>
                    cartItem.id === action.payload.id
                        ? { ...cartItem, quantity: action.payload.quantity }
                        : cartItem
                ),
            };
        case 'SET_USER':
            return { ...state, user: action.payload };
        default:
            return state;
    }
};

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
